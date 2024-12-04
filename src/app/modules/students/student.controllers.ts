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


/**
 * Get Single Student
 */
const getSingleStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getSingleStudentFromDB(
    req.params.studentId,
  );
  sendResponse(res, {
    success: true,
    message: 'Single Srudent Get Successful',
    data: result,
  });
});


/**
 * Update Single Student
 */
const updateSingleStudent= catchAsync(
  async (req, res, next) => {
    const result =
      await StudentServices.updateSingleStudentFromDB(
        req.params.studentId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      message: 'Single Student Updated Successful',
      data: result,
    });
  },
);
export const StudentsControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
};
