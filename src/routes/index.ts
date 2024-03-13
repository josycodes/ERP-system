import { Router } from 'express';

import auth from './auth';
import leads from './leads/index';
import status from './resources/status';
import category from './resources/category';

const routes = Router();

routes.use('/auth', auth);
routes.use('/leads', leads);
routes.use('/status', status);
routes.use('/category', category);

export default routes;
