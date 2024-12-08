import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

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

export const userControllers = {
  userCreate,
  facultyCreate,
};
