import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
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
  // Generate Access Token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.access_token_experies_in as string,
  );
  // Generate Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.refresh_token_experies_in as string,
  );

  return {
    accessToken,
    refreshToken,
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

/**
 *@Description Generate Token
 @Method POST
 */
const refreshToken = async (token: string) => {
  // invalid token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;
  // Check User
  const user = await User.isUserExistCustomId(userId);
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

  // Tracking Password Change Date and Jwt Issue Date
  if (
    user.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(401, 'You are not Authorized!');
  }
  // Generate Access Token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  // Generate Access Token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.access_token_experies_in as string,
  );
  return { accessToken };
};

/**
 *@Description Forget Password
 @Method POST
 */
const forgetPassword = async (userId:string) =>{
  // Check User
  const user = await User.isUserExistCustomId(userId);
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

    // Generate Access Token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  // Generate Access Token
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
  );

  const resetLink = `http://localhost:3000?id=${user?.id}&token=${resetToken}`;
  console.log(resetLink)
  sendEmail();
}
export const AuthServices = {
  userLogin,
  userPasswordChang,
  refreshToken,
  forgetPassword,
};
