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

  const result = await userServices.userSaveToDB(password, student, req.file);
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
  const { userId, role } = req.user;
  const result = await userServices.getMeFromDb(userId, role);
  sendResponse(res, {
    success: true,
    message: 'Loggedin User Data Fatch Successful',
    data: result,
  });
});

/**
 *
 * @Desc Update User Status
 * @returns Response with Data
 * @method POST
 */
const updateStatus = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await userServices.userStatusUpdate(id, req.body);
  sendResponse(res, {
    success: true,
    message: 'Status Updated Successful Successful',
    data: result,
  });
});

export const userControllers = {
  userCreate,
  facultyCreate,
  adminCreate,
  getMe,
  updateStatus,
};
