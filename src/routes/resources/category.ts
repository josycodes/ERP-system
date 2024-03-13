import { Router } from 'express';
import { authorizeRequest } from '../../middlewares/authorization';
import { allCategories } from '../../controllers/resources/category.controller';

const routes = Router();

routes.use(authorizeRequest);

routes.get('/list', allCategories);

export default routes;
