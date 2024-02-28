import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import {
    ILeadsCreateRequest,
    ILeadGetRequest,
    ILeadUpdateRequest, ILeadUpdateStatusRequest
} from '../../interfaces/requests/leads.request.interface';
 import { createLead, allLeads, getLead , updateLead, updateLeadStatus } from '../../controllers/leads/leads.controller';
 import { authorizeRequest } from '../../middlewares/authorization';
import { IRequestQuery } from '../../interfaces/requests/request.interface';

const routes = Router();

routes.use(authorizeRequest);

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
);

routes.get('/list',
    celebrate({
        [Segments.QUERY]: Joi.object<IRequestQuery, true>({
        search: Joi.string(),
        page: Joi.number().positive().default(1),
        limit: Joi.number().positive().default(10).max(100),
        status: Joi.string(),
        customer_id: Joi.number().positive(),
        from: Joi.string().isoDate(),
        to: Joi.string().isoDate()
        })
    }),
    allLeads
);

routes.get('/list/:lead_id'
    ,celebrate({
        [Segments.PARAMS]: Joi.object<ILeadGetRequest, true>({
            lead_id: Joi.number().positive()
        })
    }),
    getLead);

routes.patch('/update/:lead_id',
    celebrate({
        [Segments.PARAMS]: Joi.object<ILeadGetRequest, true>({
            lead_id: Joi.number().positive()
        }),
        [Segments.BODY]: Joi.object<ILeadUpdateRequest, true>({
            lead_value: Joi.number().required(),
        }),
    }),
    updateLead);

routes.patch('/update/status/:lead_id',
    celebrate({
        [Segments.PARAMS]: Joi.object<ILeadGetRequest, true>({
            lead_id: Joi.number().positive()
        }),
        [Segments.BODY]: Joi.object<ILeadUpdateStatusRequest, true>({
            status: Joi.string().required(),
        }),
    }),
    updateLeadStatus);

export default routes;
