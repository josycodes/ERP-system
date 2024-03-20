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
                id: Joi.number().positive(),
                entity_id:Joi.number().positive(),
                entity: Joi.string()
            }).optional(),
            status: Joi.string().allow(NOTE_STATUS.AUTO_SAVE, NOTE_STATUS.DONE, NOTE_STATUS.DRAFT).only()
        })
    }),
    create
)

export default routes;
