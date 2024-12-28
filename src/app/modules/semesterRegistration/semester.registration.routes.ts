import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidationSchemas } from './semester.registration.validation';
import { SemesterRegisterControllers } from './semester.registration.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Create Semester Registration
route.post(
  '/create-semester-registration',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidationSchemas.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegisterControllers.createSemesterRegistration,
);
// Update Semester Registration
route.patch(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidationSchemas.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegisterControllers.updateSingleSemesterRegistration,
);
// Get All  Semester Register
route.get(
  '/',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegisterControllers.getSemesterRegistration,
);
// Get Single Semester Registration
route.get(
  '/:id',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegisterControllers.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = route;
