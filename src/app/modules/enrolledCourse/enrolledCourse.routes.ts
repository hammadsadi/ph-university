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

export const EnrolledCourseRoutes = route;
