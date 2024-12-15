import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
/**
 *@Description Login User
 @Method POST
 */
const userLogin = async (payload: TLogin) => {
  // Check User
  const user = await User.isUserExistCustomId(payload.id);
  if (!user) {
    throw new AppError(400, 'User Not Found!');
  }

  // Check User Is Deleted Or Not
  if (user?.isDeleted) {
    throw new AppError(400, 'User Not Found Bacuase User is Deleted!');
  }
  // Check User Status Block Or Not
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

/**
 *@Description User Password Change
 @Method POST
 */
const userPasswordChang = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Check User
  const user = await User.isUserExistCustomId(userData.userId);
  if (!user) {
    throw new AppError(400, 'User Not Found!');
  }

  // Check User Is Deleted Or Not
  if (user?.isDeleted) {
    throw new AppError(400, 'User Not Found Bacuase User is Deleted!');
  }
  // Check User Status Block Or Not
  if (user?.status === 'block') {
    throw new AppError(400, 'User Blocked!');
  }
  // Check Password
  if (!(await User.isCheckPassword(payload.oldPassword, user?.password))) {
    throw new AppError(403, 'Password Do Not Match!');
  }
  // Has New Password
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solr_round),
  );
  await User.findOneAndUpdate(
    { id: userData.userId },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );
  return null;
};

export const AuthServices = {
  userLogin,
  userPasswordChang,
};
