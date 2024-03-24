"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const leads_controller_1 = require("../../controllers/leads/leads.controller");
const authorization_1 = require("../../middlewares/authorization");
const media_1 = __importDefault(require("./media"));
const email_1 = __importDefault(require("./email"));
const notes_1 = __importDefault(require("./notes"));
const routes = (0, express_1.Router)();
routes.use(authorization_1.authorizeRequest);
routes.use('/document', media_1.default);
routes.use('/email', email_1.default);
routes.post('/create', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        phone: celebrate_1.Joi.string().required(),
        address: celebrate_1.Joi.string().required(),
        leads_category: celebrate_1.Joi.number().required(),
        message: celebrate_1.Joi.string().required(),
        preferred_contact_method: celebrate_1.Joi.string().required(),
    })
}), leads_controller_1.createLead);
routes.get('/list', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        search: celebrate_1.Joi.string(),
        page: celebrate_1.Joi.number().positive().default(1),
        limit: celebrate_1.Joi.number().positive().default(10).max(100),
        status: celebrate_1.Joi.string(),
        customer_id: celebrate_1.Joi.number().positive(),
        from: celebrate_1.Joi.string().isoDate(),
        to: celebrate_1.Joi.string().isoDate()
    })
}), leads_controller_1.allLeads);
routes.get('/list/:lead_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        lead_id: celebrate_1.Joi.number().positive()
    })
}), leads_controller_1.getLead);
routes.patch('/update/:lead_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        lead_id: celebrate_1.Joi.number().positive()
    }),
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        lead_value: celebrate_1.Joi.number().required(),
    }),
}), leads_controller_1.updateLead);
routes.patch('/update/status/:lead_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        lead_id: celebrate_1.Joi.number().positive()
    }),
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        status: celebrate_1.Joi.string().required(),
    }),
}), leads_controller_1.updateLeadStatus);
routes.use(notes_1.default);
exports.default = routes;
