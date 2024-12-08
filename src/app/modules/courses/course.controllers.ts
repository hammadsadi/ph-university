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
 * @Description  Get All Course
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseFromDB();
  sendResponse(res, {
    success: true,
    message: 'Courses Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Course
 * @param ''
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
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */

// const updateSingleAdmin = catchAsync(async (req, res, next) => {
//   const result = await AdminServices.updateSingleAdminFromDB(
//     req.params.id,
//     req.body,
//   );
//   sendResponse(res, {
//     success: true,
//     message: 'Single Admin Updated Successful',
//     data: result,
//   });
// });

/**
 * @Description  Delete Single Course
 * @param ''
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
  //   updateSingleAdmin,
  deleteSingleCourse,
  createCourse,
};
