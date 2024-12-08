import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.services';

/**
 * @Description  Gwet All Faculty
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getAllFacultyFromDB();
  sendResponse(res, {
    success: true,
    message: 'Faculty Get Successful',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
};
