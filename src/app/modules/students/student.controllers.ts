import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

/**
 * Get All Students
 */
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
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
  const result = await StudentServices.getSingleStudentFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Single Srudent Get Successful',
    data: result,
  });
});

/**
 * Update Single Student
 */
const updateSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentFromDB(id, student);
  sendResponse(res, {
    success: true,
    message: 'Single Student Updated Successful',
    data: result,
  });
});

/**
 * Update Single Student
 */
const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.deleteSingleStudentFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Single Student Deleted Successful',
    data: result,
  });
});

export const StudentsControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
