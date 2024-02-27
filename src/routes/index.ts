import { Router } from 'express';

import auth from './auth';
import leads from './leads/index';
import status from './resources/status';

const routes = Router();

routes.use('/auth', auth);
routes.use('/lead', leads);
routes.use('/status', status);

export default routes;
