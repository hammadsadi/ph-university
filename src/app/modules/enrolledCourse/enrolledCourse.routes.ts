import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidationSchemas } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controllers';
import authChecking from '../../middlewares/authChecking';

// Route init
const route = Router();

// Create Enroll Course
route.post(
  '/create-enrolled-course',
  authChecking('student'),
  validateRequest(
    EnrolledCourseValidationSchemas.createEnrolledCourseValidation,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

// Update Enroll Course Marks
route.post(
  '/update-enrolled-course-marks',
  authChecking('faculty'),
  validateRequest(
    EnrolledCourseValidationSchemas.updateCourseMarksValidation,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = route;
