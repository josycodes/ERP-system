import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { login } from '../controllers/auth';
import { IAuthLoginRequest } from '../interfaces/requests/auth.request.interface';

const routes = Router();

routes.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object<IAuthLoginRequest, true>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  }),
  login
)

export default routes;
