import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidationSchemas } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controllers';

// Route init
const route = Router();

// Create Enroll Course
route.post(
  '/create-enrolled-course',
  validateRequest(
    EnrolledCourseValidationSchemas.createEnrolledCourseValidation,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRoutes = route;
