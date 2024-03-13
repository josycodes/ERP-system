import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { authorizeRequest } from '../../middlewares/authorization';
import { uploadFileMiddleware } from '../../middlewares/fileUpload.middleware';
import { documentUpload, allLeadDocuments } from '../../controllers/leads/media.controller';
import {ILeadGetRequest} from "../../interfaces/requests/leads.request.interface";

const routes = Router();

routes.use(authorizeRequest);

routes.post(
    '/upload/:lead_id',
    celebrate({
        [Segments.PARAMS]: Joi.object<ILeadGetRequest, true>({
            lead_id: Joi.number().positive()
        })
    }),
    uploadFileMiddleware,
    documentUpload
);

routes.get('/documents/:lead_id',
    celebrate({
        [Segments.PARAMS]: Joi.object<ILeadGetRequest, true>({
            lead_id: Joi.number().positive()
        })
    }),
    allLeadDocuments);








export default routes;
