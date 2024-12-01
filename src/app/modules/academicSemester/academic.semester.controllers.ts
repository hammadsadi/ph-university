import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academic.semester.services';

/**
 * Create User Controller
 */
const academicSemesterCreate = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.academicSemesterSaveToDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'User Created Successful',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  academicSemesterCreate,
};
