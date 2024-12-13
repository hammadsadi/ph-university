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
// Updated Offered Course
route.patch(
  '/:id',
  validateRequest(
    OfferCourseValidationSchemas.updateOfferCourseValidationSchema,
  ),
  OfferCourseCOntrollers.updatedOfferCourse,
);
export const OfferCourseRoutes = route;
