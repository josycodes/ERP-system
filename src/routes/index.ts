import { Router } from 'express';

import auth from './auth';
import leads from './leads';
import status from './resources/status';
import category from './resources/category';
import template from './template/templates';

const routes = Router();

routes.use('/auth', auth);
routes.use('/leads', leads);
routes.use('/status', status);
routes.use('/category', category);
routes.use('/template', template);

export default routes;
