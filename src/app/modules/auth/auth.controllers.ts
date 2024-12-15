/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  sendResponse(res, {
    success: true,
    message: 'Login Successful Successful',
    data: result,
  });
});

/**
 * @Description  Change Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const changeUserPassword = catchAsync(async (req, res, next) => {
  console.log(req.user, req.body)
  const {...passwordData} = req.body
  const result = await AuthServices.userPasswordChang(req.user, passwordData);
  sendResponse(res, {
    success: true,
    message: 'Password Changed Successful',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changeUserPassword,
};
