/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import { User } from '../modules/users/user.model';
const authChecking = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Token Check
    if (!token) {
      throw new AppError(401, 'You are not Authorized!');
    }
    let decoded;
    try {
      // invalid token
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(401, 'You are Not Authorized!');
    }

    // Check Role
    const { role, userId, iat } = decoded;
    // Check User
    const user = await User.isUserExistCustomId(userId);
    if (!user) {
      throw new AppError(401, 'You are not Authorized!');
    }

    // Check User Is Deleted Or Not
    if (user?.isDeleted) {
      throw new AppError(401, 'User Not Found Bacuase User is Deleted!');
    }
    // Check User Status Block Or Not
    if (user?.status === 'block') {
      throw new AppError(400, 'User Blocked!');
    }

    // Tracking Password Change Date and Jwt Issue Date
    if (
      user.passwordChangedAt &&
      User.isJwtIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(401, 'You are not Authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not Authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authChecking;
