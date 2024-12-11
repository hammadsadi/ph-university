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
// Get All Admission Semester
// route.get(
//   '/all-admission-semester',
//   AdmissionSemesterControllers.admissionSemesterGetAllController,
// );

export const SemesterRegistrationRoutes = route;
