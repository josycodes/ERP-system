import express from 'express';

import {
  IAuthLoginRequest,
} from '../interfaces/requests/auth.request.interface';

import ErrorLib, { BadRequest, NotFound } from '../libs/Error.Lib';
import ResponseLib from '../libs/Response.Lib';
import UserMapper from '../mappers/User.Mapper';
import AuthService from '../services/Auth.Service';
import { STATUSES } from '../config';

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const body: IAuthLoginRequest = req.body;
    const auth = new AuthService();
    const user = await auth.findUserByEmail(body.email);
    await auth.validateUserPassword(body.password, user.password);
    if (user.status !== STATUSES.ACTIVE) {
      throw new ErrorLib(`Cannot login, account is ${user.status}.`, 400)
    }
    const token = await auth.generateUserToken(user);

    return new ResponseLib(req, res)
      .setHeader({ 'access-token': token }).json({
        message: 'Successfully logged in',
        data: UserMapper.toDTO(user)
      });
  } catch (error) {
    if (error instanceof NotFound || error instanceof BadRequest) {
      return next(new BadRequest('Incorrect username or password'))
    }
    next(error)
  }
}