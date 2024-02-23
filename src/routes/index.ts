import { Router } from 'express';

import auth from './auth';
import leads from './leads/index';

const routes = Router();

routes.use('/auth', auth);
routes.use('/lead', leads);

export default routes;
