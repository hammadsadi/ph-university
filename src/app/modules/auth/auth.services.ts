import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
/**
 *@Description Login User
 @Method POST
 */
const userLogin = async (payload: TLogin) => {
  // Check User
  const user = await User.isUserExistyCustomId(payload.id);
  if (!user) {
    throw new AppError(400, 'User Not Found!');
  }

  // Check User Is Deleted Or Not
  if (user?.isDeleted) {
    throw new AppError(400, 'User Not Found Bacuase User is Deleted!');
  }
  // Check User Status Or Not
  if (user?.status === 'block') {
    throw new AppError(400, 'User Blocked!');
  }
  // Check Password
  if (!(await User.isCheckPassword(payload.password, user?.password))) {
    throw new AppError(403, 'Password Do Not Match!');
  }

  // Generate Access Token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  userLogin,
};
