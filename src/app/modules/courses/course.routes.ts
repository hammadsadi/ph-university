import { Router } from 'express';
import { CourseControllers } from './course.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidationSchemas } from './course.validation';

// Route init
const route = Router();

// Get All Student
route.post(
  '/',
  validateRequest(CourseValidationSchemas.createCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getSingleCourse);
route.patch(
  '/:id',
  validateRequest(CourseValidationSchemas.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse,
);
route.delete('/:id', CourseControllers.deleteSingleCourse);

export const CourseRoutes = route;
