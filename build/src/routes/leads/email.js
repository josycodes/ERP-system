"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const notes_1 = require("../../controllers/leads/notes");
const config_1 = require("../../config");
const routes = (0, express_1.Router)();
routes.post('/:id/note/create', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required(),
        content: celebrate_1.Joi.string().required(),
        documents: celebrate_1.Joi.array().items({
            name: celebrate_1.Joi.string(),
            description: celebrate_1.Joi.string(),
            url: celebrate_1.Joi.string(),
            object_key: celebrate_1.Joi.string(),
        }).optional(),
        tags: celebrate_1.Joi.array().items({
            id: celebrate_1.Joi.number().positive(),
            entity_id: celebrate_1.Joi.number().positive(),
            entity: celebrate_1.Joi.string()
        }).optional(),
        status: celebrate_1.Joi.string().allow(config_1.NOTE_STATUS.AUTO_SAVE, config_1.NOTE_STATUS.DONE, config_1.NOTE_STATUS.DRAFT).only()
    })
}), notes_1.create);
exports.default = routes;
