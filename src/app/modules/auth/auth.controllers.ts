/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
/**
 * @Description  Login User
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const loginUser = catchAsync(async (req, res, next) => {
  const result = await AuthServices.userLogin(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login Successful Successful',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

/**
 * @Description  Change Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const changeUserPassword = catchAsync(async (req, res, next) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.userPasswordChang(req.user, passwordData);
  sendResponse(res, {
    success: true,
    message: 'Password Changed Successful',
    data: result,
  });
});


/**
 * @Description  Refresh Token
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const refreshTokenControllers = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    success: true,
    message: 'Refresh Token Retrived Successful',
    data: result,
  });
});


/**
 * @Description  Forget Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const forgetPasswordControllers = catchAsync(async (req, res, next) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId)
  sendResponse(res, {
    success: true,
    message: 'Reset Link Generated Successful',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changeUserPassword,
  refreshTokenControllers,
  forgetPasswordControllers,
};
