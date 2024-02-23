import express from 'express';
import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../interfaces/requests/auth.request.interface';
import ErrorLib, { NotFound } from '../libs/Error.Lib';
import AuthService from '../services/Auth.Service';

export const authorizeRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.headers.authorization?.split(' ')[0].toLowerCase() !== 'bearer') throw new ErrorLib('unauthorized', 401)
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new ErrorLib('unauthorized', 401)
    const { i: id, scope } = jwt.verify(token, process.env.JWT_TOKEN) as IJWTPayload
    if (scope?.length && !scope.includes(req.originalUrl) && !scope.includes(req.path)) {
      throw new ErrorLib('forbidden', 403)
    }
    const auth = new AuthService();
    const user = await auth.findUserById(id);
    req.user = user;
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof NotFound) {
      next(new ErrorLib('unauthorized', 401))
    } else {
      next(error)
    }
  }
}
