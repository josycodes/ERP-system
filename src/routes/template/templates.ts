import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ITemplateCreateRequest } from '../../interfaces/requests/templates.request.interface';
import { IRequestQuery } from '../../interfaces/requests/request.interface';
import { create, list, getOne, update, tagSearch } from "../../controllers/templates/template.controller";

const routes = Router();

routes.post(
    '/create',
    celebrate({
        [Segments.BODY]: Joi.object<ITemplateCreateRequest, true>({
            title: Joi.string().required(),
            subject: Joi.string().required(),
            content: Joi.string().required(),
            category_id: Joi.number().required(),
            share_with: Joi.array().items({
                to:Joi.string().required().valid(['everyone','user']),
                user_id: Joi.number().when('to',{
                    is: 'user',
                    then: Joi.number().required(),
                    otherwise: Joi.number().optional()
                })
            }).optional(),
            tags: Joi.array().items({
                id: Joi.number().positive(),
                entity_id:Joi.number().positive(),
                entity: Joi.string()
            }).optional()
        })
    }),
    create
);

routes.get('/list',
    celebrate({
        [Segments.QUERY]: Joi.object<IRequestQuery, true>({
            search: Joi.string(),
            page: Joi.number().positive().default(1),
            limit: Joi.number().positive().default(10).max(100),
            from: Joi.string().isoDate(),
            to: Joi.string().isoDate()
        })
    }),
    list
)

routes.get('/:template_id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            template_id: Joi.number().positive()
        })
    }),
    getOne
)

routes.patch('/update/:template_id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            template_id: Joi.number().positive()
        }),
        [Segments.BODY]:Joi.object<ITemplateCreateRequest, true>({
        title: Joi.string().required(),
        subject: Joi.string().required(),
        content: Joi.string().required(),
        category_id: Joi.number().required(),
        share_with: Joi.array().items({
            to:Joi.string().required().valid(['everyone','user']),
            user_id: Joi.number().when('to',{
                is: 'user',
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            })
        }).optional(),
        tags: Joi.array().items({
            id: Joi.number().positive(),
            entity_id:Joi.number().positive(),
            entity: Joi.string()
        }).optional()
        })
    }),
    update
)

routes.get('/search-tags',
    celebrate({
        [Segments.QUERY]: Joi.object({
            query: Joi.string()
        })
    }),
    tagSearch
)

export default routes;
