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
const Lead_entity_1 = require("../db/entities/Lead.entity");
require("dotenv/config");
const DBAdapter_1 = __importDefault(require("../adapters/DBAdapter"));
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const LeadAssignment_entity_1 = require("../db/entities/LeadAssignment.entity");
class LeadsService {
    constructor() { }
    ;
    /**
     * Create a new lead
     * @param data
     */
    createLead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customer_id, category_id, message } = data;
            const lead_code = yield this.generateLeadCode();
            const lead = yield new DBAdapter_1.default().insertAndFetch(Lead_entity_1.Lead, {
                lead_code,
                customer_id,
                category_id,
                message,
            });
            return lead;
        });
    }
    /**
     * Generate a unique lead code
     */
    generateLeadCode() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Get the prefix from the environment variable LEAD_CODE
            const prefix = process.env.LEADS_CODE || '';
            const latestLead = yield new DBAdapter_1.default().find(Lead_entity_1.Lead, {
                order: { id: 'DESC' }
            });
            let leadNumber = null; // Initialize leadNumber as null
            if (latestLead && ((_b = (_a = latestLead[0]) === null || _a === void 0 ? void 0 : _a.lead_code) === null || _b === void 0 ? void 0 : _b.startsWith(prefix))) {
                // Extract the number part by removing the prefix and parsing it as a number
                leadNumber = parseInt(latestLead[0].lead_code.slice(prefix.length));
            }
            // Increment the lead number by 1 or default to 1 if no latest lead
            leadNumber = leadNumber ? leadNumber + 1 : 1;
            let leadCode; // Initialize leadCode as a string
            // Conditionally add leading zeros based on the length of the lead number
            if (leadNumber < 10) {
                // If the length of the number is 1, add 2 leading zeros
                leadCode = prefix + '00' + leadNumber;
            }
            else if (leadNumber < 100) {
                // If the length of the number is 2, add 1 leading zero
                leadCode = prefix + '0' + leadNumber;
            }
            else {
                // If the length of the number is more than 2, don't add any leading zeros
                leadCode = prefix + leadNumber;
            }
            return leadCode;
        });
    }
    /**
     * Get all leads
     */
    allLeads(customer_id, search, page, limit, status, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [leads, total] = yield new DBAdapter_1.default().findAndCount(Lead_entity_1.Lead, {
                where: {
                    lead_code: !search ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.ILike)("%" + search + "%"),
                    customer_id: !customer_id ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : customer_id,
                    status: !status ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : status,
                    meta: {
                        deleted_flag: false,
                        created_on: from && to ? (0, typeorm_1.Between)((0, moment_1.default)(from).toDate(), (0, moment_1.default)(to).add(1, 'days').toDate()) : undefined
                    }
                },
                skip,
                take: limit,
                relations: { customer: true, category: true },
                order: { id: 'DESC' }
            });
            return { items: leads, total };
        });
    }
    findLeadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().findOne(Lead_entity_1.Lead, {
                where: { id: id },
                relations: { customer: true, category: true },
            });
        });
    }
    findLeadAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DBAdapter_1.default().findOne(LeadAssignment_entity_1.LeadAssignment, {
                where: { lead_id: id },
                relations: { user: true },
            });
        });
    }
    updateLead(id, newLeadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lead_value, status, lead_source } = newLeadData;
            // Save the updated lead to the database
            return yield new DBAdapter_1.default().updateAndFetch(Lead_entity_1.Lead, { id }, {
                lead_value,
                status,
                lead_source
            });
        });
    }
}
exports.default = LeadsService;
