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
routes.get('/:id/note/list', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({ id: celebrate_1.Joi.number() }),
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        search: celebrate_1.Joi.string(),
        page: celebrate_1.Joi.number().positive().default(1),
        limit: celebrate_1.Joi.number().positive().default(10).max(100),
        status: celebrate_1.Joi.string().allow(config_1.NOTE_STATUS.AUTO_SAVE, config_1.NOTE_STATUS.DONE, config_1.NOTE_STATUS.DRAFT).only(),
        from: celebrate_1.Joi.string().isoDate(),
        to: celebrate_1.Joi.string().isoDate()
    })
}), notes_1.list);
routes.get('/:lead_id/note/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        id: celebrate_1.Joi.number().positive(),
        lead_id: celebrate_1.Joi.number().positive()
    })
}), notes_1.getOne);
routes.patch('/:lead_id/note/:id/update', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        id: celebrate_1.Joi.number().positive(),
        lead_id: celebrate_1.Joi.number().positive()
    }),
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string(),
        content: celebrate_1.Joi.string(),
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
}), notes_1.update);
routes.get('/search-tags', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        query: celebrate_1.Joi.string()
    })
}), notes_1.tagSearch);
exports.default = routes;
