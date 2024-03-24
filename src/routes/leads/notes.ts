import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { INotesCreateRequest } from '../../interfaces/requests/notes.request.interface';
import { create, getOne, list, tagSearch, update } from '../../controllers/leads/notes';
import { NOTE_STATUS } from '../../config';
import { IRequestQuery } from '../../interfaces/requests/request.interface';

const routes = Router();

routes.post(
    '/:id/note/create',
    celebrate({
        [Segments.BODY]: Joi.object<INotesCreateRequest, true>({
            title: Joi.string().required(),
            content: Joi.string().required(),
            documents: Joi.array().items({
                name: Joi.string(),
                description: Joi.string(),
                url: Joi.string(),
                object_key: Joi.string(),
            }).optional(),
            tags: Joi.array().items({
                tag_id: Joi.number().positive(),
                entity_id:Joi.number().positive(),
                entity: Joi.string()
            }).optional(),
            status: Joi.string().allow(NOTE_STATUS.AUTO_SAVE, NOTE_STATUS.DONE, NOTE_STATUS.DRAFT).only()
        })
    }),
    create
)

routes.get('/:id/note/list',
    celebrate({
        [Segments.PARAMS]: Joi.object({ id: Joi.number()}),
        [Segments.QUERY]: Joi.object<IRequestQuery, true>({
            search: Joi.string(),
            page: Joi.number().positive().default(1),
            limit: Joi.number().positive().default(10).max(100),
            status: Joi.string().allow(NOTE_STATUS.AUTO_SAVE, NOTE_STATUS.DONE, NOTE_STATUS.DRAFT).only(),
            from: Joi.string().isoDate(),
            to: Joi.string().isoDate()
        })
    }),
    list
)

routes.get('/:lead_id/note/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.number().positive(),
            lead_id: Joi.number().positive()
        })
    }),
    getOne
)

routes.patch('/:lead_id/note/:id/update',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.number().positive(),
            lead_id: Joi.number().positive()
        }),
        [Segments.BODY]: Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            documents: Joi.array().items({
                name: Joi.string(),
                description: Joi.string(),
                url: Joi.string(),
                object_key: Joi.string(),
            }).optional(),
            tags: Joi.array().items({
                id: Joi.number().positive(),
                entity_id:Joi.number().positive(),
                entity: Joi.string()
            }).optional(),
            status: Joi.string().allow(NOTE_STATUS.AUTO_SAVE, NOTE_STATUS.DONE, NOTE_STATUS.DRAFT).only()
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
