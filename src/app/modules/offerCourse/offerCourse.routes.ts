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

// Get All Offered Course
route.get('/', OfferCourseCOntrollers.getOfferCourse);

// Get Single Offered Course
route.get('/:id', OfferCourseCOntrollers.getSingleOfferCourse);

// Updated Offered Course
route.patch(
  '/:id',
  validateRequest(
    OfferCourseValidationSchemas.updateOfferCourseValidationSchema,
  ),
  OfferCourseCOntrollers.updatedOfferCourse,
);
// Delete Offered Course
route.delete('/:id', OfferCourseCOntrollers.deleteOfferCourse);
export const OfferCourseRoutes = route;
