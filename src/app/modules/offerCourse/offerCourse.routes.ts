import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferCourseValidationSchemas } from './offerCourse.validation';
import { OfferCourseCOntrollers } from './offerCourse.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Create Offer Course
route.post(
  '/',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    OfferCourseValidationSchemas.createOfferCourseValidationSchema,
  ),
  OfferCourseCOntrollers.createOfferCourse,
);

// Get All Offered Course
route.get(
  '/',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferCourseCOntrollers.getOfferCourse,
);

// Get Single Offered Course
route.get(
  '/:id',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferCourseCOntrollers.getSingleOfferCourse,
);

// Updated Offered Course
route.patch(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    OfferCourseValidationSchemas.updateOfferCourseValidationSchema,
  ),
  OfferCourseCOntrollers.updatedOfferCourse,
);
// Delete Offered Course
route.delete(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  OfferCourseCOntrollers.deleteOfferCourse,
);
export const OfferCourseRoutes = route;
