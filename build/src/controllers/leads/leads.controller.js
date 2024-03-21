"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadStatus = exports.updateLead = exports.getLead = exports.allLeads = exports.createLead = void 0;
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const Lead_Mapper_1 = __importDefault(require("../../mappers/Lead.Mapper"));
const Leads_service_1 = __importDefault(require("../../services/Leads.service"));
const Customer_service_1 = __importDefault(require("../../services/Customer.service"));
const Status_service_1 = __importDefault(require("../../services/Status.service"));
const Utils_Service_1 = __importDefault(require("../../services/Utils.Service"));
const Error_Lib_1 = require("../../libs/Error.Lib");
const createLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const leadService = new Leads_service_1.default();
    const customerService = new Customer_service_1.default();
    try {
        // Check if the customer exists, then create a new customer if necessary
        let customer;
        const existingCustomer = yield customerService.getCustomerByEmail(body.email);
        if (!existingCustomer) {
            // Create a new customer
            customer = yield customerService.createCustomer({
                name: body.name,
                email: body.email,
                phone: body.phone,
                address: body.address,
                preferred_contact_method: body.preferred_contact_method
            });
        }
        else {
            customer = existingCustomer;
        }
        // Create the lead
        const lead = yield leadService.createLead({
            customer_id: customer.id,
            category_id: body.leads_category,
            message: body.message
        });
        return new Response_Lib_1.default(req, res)
            .status(201)
            .json({
            status: true,
            message: 'Lead Created Successfully',
            data: Lead_Mapper_1.default.toDTO(Object.assign(Object.assign({}, lead), { customer }))
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createLead = createLead;
/**
 * Get all leads
 * @param req
 * @param res
 * @param next
 */
const allLeads = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const leadService = new Leads_service_1.default();
    const { page, limit, status, from, to, customer_id, search } = req.query;
    try {
        // Get all Leads
        const leads = yield leadService.allLeads(Number(customer_id), search, Number(page), Number(limit), status, from, to);
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Leads Loaded Successfully',
            data: leads.items.map(lead => Lead_Mapper_1.default.toDTO(lead)),
            meta: Utils_Service_1.default.paginate(req.query, leads)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allLeads = allLeads;
const getLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { lead_id } = req.params;
    const leadService = new Leads_service_1.default();
    try {
        // Get Lead
        const lead = yield leadService.findLeadById(parseInt(lead_id));
        const leadAssignment = yield leadService.findLeadAssignment(parseInt(lead_id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead not found.');
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Lead Loaded Successfully',
            data: Object.assign(Object.assign({}, Lead_Mapper_1.default.toDTO(lead)), { LeadAssignment: {
                    id: leadAssignment === null || leadAssignment === void 0 ? void 0 : leadAssignment.user.id,
                    name: leadAssignment === null || leadAssignment === void 0 ? void 0 : leadAssignment.user.name,
                    picture: (_a = leadAssignment === null || leadAssignment === void 0 ? void 0 : leadAssignment.user.profile_picture) === null || _a === void 0 ? void 0 : _a.url
                } })
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getLead = getLead;
const updateLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lead_id } = req.params;
    const { lead_value } = req.body;
    const leadService = new Leads_service_1.default();
    try {
        // Get Lead
        const lead = yield leadService.findLeadById(parseInt(lead_id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead not found.');
        //update lead
        const updatedLead = yield leadService.updateLead(Number(lead_id), { lead_value });
        if (!updatedLead)
            throw new Error_Lib_1.BadRequest('Failed to Update lead.');
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Lead updated Successfully',
            data: Lead_Mapper_1.default.toDTO(updatedLead)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateLead = updateLead;
const updateLeadStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lead_id } = req.params;
    const { status } = req.body;
    const leadService = new Leads_service_1.default();
    const statusService = new Status_service_1.default();
    try {
        const allStatuses = yield statusService.allStatuses();
        const allowedStatuses = allStatuses.map(status => status.slug);
        // Check if the provided status exists in the list of allowed statuses
        if (!allowedStatuses.includes(status))
            throw new Error_Lib_1.BadRequest('Invalid status provided');
        // Get Lead
        const lead = yield leadService.findLeadById(parseInt(lead_id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead Not Found');
        //update lead
        const updatedLead = yield leadService.updateLead(Number(lead_id), { status });
        if (!updatedLead)
            throw new Error_Lib_1.BadRequest('Failed to update lead.');
        return new Response_Lib_1.default(req, res)
            .json({
            status: true,
            message: 'Lead Loaded Successfully',
            data: Lead_Mapper_1.default.toDTO(updatedLead)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateLeadStatus = updateLeadStatus;
