import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { admissionSemesterValidationSchemas } from './admission.semester.validation';
import { AdmissionSemesterControllers } from './academic.semester.controllers';

// Route init
const route = Router();

// Create Semester
route.post(
  '/create-admission-semester',
  validateRequest(
    admissionSemesterValidationSchemas.createAdmissionSemesterValidation,
  ),
  AdmissionSemesterControllers.admissionSemesterCreate,
);
// Get All Admission Semester
route.get(
  '/all-admission-semester',
  AdmissionSemesterControllers.admissionSemesterGetAllController,
);
// Get Single Admission Semester
route.get(
  '/:semesterId',
  AdmissionSemesterControllers.admissionSemesterGetSingleController,
);

// Update Single Admission Semester
route.patch(
  '/:semesterId',
  validateRequest(
    admissionSemesterValidationSchemas.updateAdmissionSemesterValidation,
  ),
  AdmissionSemesterControllers.updateSingleAdmissionSemesterControllers,
);

export const AdmissionSemesterRoutes = route;
