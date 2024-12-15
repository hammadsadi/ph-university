import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
const authChecking = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Token Check
    if (!token) {
      throw new AppError(401, 'You are not Authorized!');
    }
    // invalid token
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(401, 'You are not Authorized!');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default authChecking;
