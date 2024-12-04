import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

/**
 * Get All Students
 */
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    success: true,
    message: 'Students Get Successful',
    data: result,
  });
});

export const StudentsControllers = {
  getAllStudents,
};
