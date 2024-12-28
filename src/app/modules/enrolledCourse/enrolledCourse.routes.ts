import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidationSchemas } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Create Enroll Course
route.post(
  '/create-enrolled-course',
  authChecking(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidationSchemas.createEnrolledCourseValidation,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

// Update Enroll Course Marks
route.patch(
  '/update-enrolled-course-marks',
  authChecking(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  validateRequest(EnrolledCourseValidationSchemas.updateCourseMarksValidation),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

// Update Enroll Course Marks
route.get(
  '/all-enrolled-courses',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
  ),
  EnrolledCourseControllers.getAllEnrolledCourse,
);

export const EnrolledCourseRoutes = route;
