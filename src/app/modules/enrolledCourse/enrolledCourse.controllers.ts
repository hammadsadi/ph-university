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
  const result = await EnrolledCourseServices.saveEnrolledCourseToDB();
  sendResponse(res, {
    success: true,
    message: 'Offer Course Deleted Successful',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
};
