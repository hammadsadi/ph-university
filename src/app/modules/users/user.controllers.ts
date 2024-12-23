/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

/**
 * Create User Controller
 */
const userCreate = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await userServices.userSaveToDB(password, student);
  sendResponse(res, {
    success: true,
    message: 'User Created Successful',
    data: result,
  });
});

/**
 *
 * @Desc Faculty Controller
 * @returns Response with Data
 * @method POST
 */
const facultyCreate = catchAsync(async (req, res, next) => {
  const result = await userServices.facultySaveToDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Faculty Created Successful',
    data: result,
  });
});

/**
 *
 * @Desc Admin Controller
 * @returns Response with Data
 * @method POST
 */
const adminCreate = catchAsync(async (req, res, next) => {
  const result = await userServices.adminSaveToDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Admin Created Successful',
    data: result,
  });
});

/**
 *
 * @Desc Me Controller
 * @returns Response with Data
 * @method GET
 */
const getMe = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  // Check Token
  if (!token) {
    throw new AppError(400, 'Invalid Request');
  }
  const result = await userServices.getMeFromDb(token);
  sendResponse(res, {
    success: true,
    message: 'Loggedin User Data Fatch Successful',
    data: result,
  });
});

export const userControllers = {
  userCreate,
  facultyCreate,
  adminCreate,
  getMe,
};
