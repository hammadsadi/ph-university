/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourses.services';

/**
 * @Description  Create Enrolled Course
 * @param '
 * @returns Response with data
 * @Method POST
 */

const createEnrolledCourse = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.saveEnrolledCourseToDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Course Enrolled Successful',
    data: result,
  });
});


/**
 * @Description  Update Enrolled Course Marks
 * @param '
 * @returns Response with data
 * @Method POST
 */

const updateEnrolledCourseMarks = catchAsync(async (req, res, next) => {
console.log(req.user)
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksFromDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Course Enrolled Marks Updated Successful!',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
