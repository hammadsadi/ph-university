import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidationSchemas } from './semester.registration.validation';
import { SemesterRegisterControllers } from './semester.registration.controllers';

// Route init
const route = Router();

// Create Semester Registration
route.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidationSchemas.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegisterControllers.createSemesterRegistration,
);
// Update Semester Registration
route.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidationSchemas.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegisterControllers.updateSingleSemesterRegistration,
);
// Get All  Semester Register
route.get('/', SemesterRegisterControllers.getSemesterRegistration);
// Get Single Semester Registration
route.get('/:id', SemesterRegisterControllers.getSingleSemesterRegistration);

export const SemesterRegistrationRoutes = route;
