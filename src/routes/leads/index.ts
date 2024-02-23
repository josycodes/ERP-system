import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ILeadsCreateRequest } from '../../interfaces/requests/leads.request.interface';
 import { createLead } from '../../controllers/leads/leads.controller';

const routes = Router();

routes.post(
    '/create',
    celebrate({
        [Segments.BODY]: Joi.object<ILeadsCreateRequest, true>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            leads_category: Joi.number().required(),
            message: Joi.string().required(),
            preferred_contact_method: Joi.string().required(),
        })
    }),
    createLead
)

export default routes;
