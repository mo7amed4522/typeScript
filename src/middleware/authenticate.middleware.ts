import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import Error from '../interface/error.interface';

const handleauthenticateerror = (next: NextFunction) => {
  const error: Error = new Error('login Error: please try again');
  error.status = 401;
  next(error);
};
const vaildTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get auth header
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (bearer && token == 'bearer token') {
        const decode = jwt.verify(token, config.token as unknown as string);
        if (decode) {
          next();
        } else {
          handleauthenticateerror(next);
        }
      } else {
        handleauthenticateerror(next);
      }
    } else {
      handleauthenticateerror(next);
    }
  } catch (error) {
    handleauthenticateerror(next);
  }
};

export default vaildTokenMiddleware;
