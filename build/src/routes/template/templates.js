"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const template_controller_1 = require("../../controllers/templates/template.controller");
const routes = (0, express_1.Router)();
routes.post('/create', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required(),
        subject: celebrate_1.Joi.string().required(),
        content: celebrate_1.Joi.string().required(),
        category_id: celebrate_1.Joi.number().required(),
        share_with: celebrate_1.Joi.array().items({
            to: celebrate_1.Joi.string().required().valid(['everyone', 'user']),
            user_id: celebrate_1.Joi.number().when('to', {
                is: 'user',
                then: celebrate_1.Joi.number().required(),
                otherwise: celebrate_1.Joi.number().optional()
            })
        }).optional(),
        tags: celebrate_1.Joi.array().items({
            id: celebrate_1.Joi.number().positive(),
            entity_id: celebrate_1.Joi.number().positive(),
            entity: celebrate_1.Joi.string()
        }).optional()
    })
}), template_controller_1.create);
routes.get('/list', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        search: celebrate_1.Joi.string(),
        page: celebrate_1.Joi.number().positive().default(1),
        limit: celebrate_1.Joi.number().positive().default(10).max(100),
        from: celebrate_1.Joi.string().isoDate(),
        to: celebrate_1.Joi.string().isoDate()
    })
}), template_controller_1.list);
routes.get('/:template_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        template_id: celebrate_1.Joi.number().positive()
    })
}), template_controller_1.getOne);
routes.patch('/update/:template_id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        template_id: celebrate_1.Joi.number().positive()
    }),
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required(),
        subject: celebrate_1.Joi.string().required(),
        content: celebrate_1.Joi.string().required(),
        category_id: celebrate_1.Joi.number().required(),
        share_with: celebrate_1.Joi.array().items({
            to: celebrate_1.Joi.string().required().valid(['everyone', 'user']),
            user_id: celebrate_1.Joi.number().when('to', {
                is: 'user',
                then: celebrate_1.Joi.number().required(),
                otherwise: celebrate_1.Joi.number().optional()
            })
        }).optional(),
        tags: celebrate_1.Joi.array().items({
            id: celebrate_1.Joi.number().positive(),
            entity_id: celebrate_1.Joi.number().positive(),
            entity: celebrate_1.Joi.string()
        }).optional()
    })
}), template_controller_1.update);
routes.get('/search-tags', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object({
        query: celebrate_1.Joi.string()
    })
}), template_controller_1.tagSearch);
exports.default = routes;
