import { Router } from 'express';
import { authorizeRequest } from '../../middlewares/authorization';
import { allStatuses } from '../../controllers/resources/status.controller';

const routes = Router();

routes.use(authorizeRequest);

routes.get('/list', allStatuses);

export default routes;
