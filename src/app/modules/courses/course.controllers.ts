/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.services';

/**
 * @Description  Create New Course
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.courseSaveToDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Courses Created Successful',
    data: result,
  });
});

/**
 * @Description  Assign Faculties with Course
 * @param courseId
 * @returns Response with data
 * @Method PUT
 */

const assignFacultiesWuthCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseServices.assignFacultiesWithCoursesIntoDB(
    courseId,
    req.body.faculties,
  );
  sendResponse(res, {
    success: true,
    message: 'Assigned Faculties With Coureses Successful',
    data: result,
  });
});

/**
 * @Description  Remove Faculties From Course
 * @param courseId
 * @returns Response with data
 * @Method DELETE
 */

const removeFacultiesFromCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseServices.removeFacultiesFromCoursesIntoDB(
    courseId,
    req.body.faculties,
  );
  sendResponse(res, {
    success: true,
    message: 'Remove Faculties From Courese Successful',
    data: result,
  });
});

/**
 * @Description  Get All Course
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Courses Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Course
 * @param id
 * @returns Response with data
 * @Method GET
 */

const getSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Course Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Course
 * @param id
 * @returns Response with data
 * @Method PATCH
 */

const updateSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.updateSingleCourseFromDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Single Course Updated Successful',
    data: result,
  });
});

/**
 * @Description  Delete Single Course
 * @param id
 * @returns Response with data
 * @Method DELETE
 */

const deleteSingleCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.deleteSingleCourseFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Course Deleted Successful',
    data: result,
  });
});

export const CourseControllers = {
  getAllCourses,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
  createCourse,
  assignFacultiesWuthCourse,
  removeFacultiesFromCourse,
};
