import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferCourseValidationSchemas } from './offerCourse.validation';
import { OfferCourseCOntrollers } from './offerCourse.controllers';

// Route init
const route = Router();

// Create Offer Course
route.post(
  '/',
  validateRequest(
    OfferCourseValidationSchemas.createOfferCourseValidationSchema,
  ),
  OfferCourseCOntrollers.createOfferCourse,
);
// route.get('/', CourseControllers.getAllCourses);
// route.get('/:id', CourseControllers.getSingleCourse);
// route.put(
//   '/:courseId/assign-faculties',
//   validateRequest(
//     CourseValidationSchemas.assignCourseWithFacultiesValidationSchema,
//   ),
//   CourseControllers.assignFacultiesWuthCourse,
// );
// route.delete(
//   '/:courseId/remove-faculties',
//   validateRequest(
//     CourseValidationSchemas.assignCourseWithFacultiesValidationSchema,
//   ),
//   CourseControllers.removeFacultiesFromCourse,
// );
// route.patch(
//   '/:id',
//   validateRequest(CourseValidationSchemas.updateCourseValidationSchema),
//   CourseControllers.updateSingleCourse,
// );
// route.delete('/:id', CourseControllers.deleteSingleCourse);

export const OfferCourseRoutes = route;
