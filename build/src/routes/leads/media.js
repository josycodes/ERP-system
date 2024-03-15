"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const fileUpload_middleware_1 = require("../../middlewares/fileUpload.middleware");
const media_controller_1 = require("../../controllers/leads/media.controller");
const routes = (0, express_1.Router)();
routes.post('/upload/:lead_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        lead_id: celebrate_1.Joi.number().positive()
    })
}), fileUpload_middleware_1.uploadFileMiddleware, media_controller_1.documentUpload);
routes.get('/documents/:lead_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        lead_id: celebrate_1.Joi.number().positive()
    })
}), media_controller_1.allLeadDocuments);
exports.default = routes;
