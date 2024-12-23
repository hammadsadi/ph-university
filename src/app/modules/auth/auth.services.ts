import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, tokenVerify } from './auth.utils';
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
  const decoded: JwtPayload = tokenVerify(
    token,
    config.jwt_refresh_token as string,
  );
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
const forgetPassword = async (userId: string) => {
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

  const resetLink = `${config.client_base_url}?id=${user?.id}&token=${resetToken}`;
  const to = user?.email;
  const sub = 'Password Reset Request 🗝️';
  const eText = `Dear ${user?.role},
We have received a request to reset your password for your account. If you did not make this request, please disregard this email.

To reset your password, please click the following link:
${resetLink}

If you need any assistance or have any questions, feel free to reach out to our support team.

Thank you for being a valued member of the PH Islamic University community.

Best regards,
The PH Islamic University Team
devteamsaadi@gmail.com`;
  const eHtml = `<html>
    <body>
      <p>Dear ${user?.role},</p>

      <p>We have received a request to reset your password for your account. If you did not make this request, please disregard this email.</p>

      <p>To reset your password, click the link below:</p>
      
      <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; cursor: pointer;">Reset My Password</a></p>

      <p>If you need any assistance or have any questions, please don’t hesitate to contact our support team at devteamsaadi@gmail.com.</p>

      <p>Thank you for being a valued member of the PH University community.</p>

      <p>Best regards,<br>The PH University Team</p>

      <footer>
        <p style="font-size: 12px; color: gray;">If you did not request a password reset, please ignore this email. For support, contact us at devteamsaadi@gmail.com.</p>
        <p style="font-size: 10px; color: gray;">+8801760170010</p>
      </footer>
    </body>
  </html>`;
  sendEmail(to, sub, eText, eHtml);
};

/**
 *@Description Reset Password
 @Method POST
 */
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // Check User
  const user = await User.isUserExistCustomId(payload?.id);
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
  // Check token
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  // Check User Id
  if (decoded?.userId !== payload.id) {
    throw new AppError(403, 'You are forbidden!');
  }

  // Has New Password
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solr_round),
  );
  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded?.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );
};

export const AuthServices = {
  userLogin,
  userPasswordChang,
  refreshToken,
  forgetPassword,
  resetPassword,
};
