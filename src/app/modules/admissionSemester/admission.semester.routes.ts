import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { admissionSemesterValidationSchemas } from './admission.semester.validation';
import { AdmissionSemesterControllers } from './academic.semester.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Create Semester
route.post(
  '/create-admission-semester',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    admissionSemesterValidationSchemas.createAdmissionSemesterValidation,
  ),
  AdmissionSemesterControllers.admissionSemesterCreate,
);
// Get All Admission Semester
route.get(
  '/all-admission-semester',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AdmissionSemesterControllers.admissionSemesterGetAllController,
);
// Get Single Admission Semester
route.get(
  '/:semesterId',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AdmissionSemesterControllers.admissionSemesterGetSingleController,
);

// Update Single Admission Semester
route.patch(
  '/:semesterId',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    admissionSemesterValidationSchemas.updateAdmissionSemesterValidation,
  ),
  AdmissionSemesterControllers.updateSingleAdmissionSemesterControllers,
);

export const AdmissionSemesterRoutes = route;
