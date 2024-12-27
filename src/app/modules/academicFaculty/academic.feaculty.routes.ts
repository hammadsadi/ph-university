import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidationSchemas } from './academic.faculty.validation';
import { AcademicFeacultyControllers } from './academic.feaculty.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Create Feaculty
route.post(
  '/create-academic-feaculty',
  authChecking(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidationSchemas.createAcademicFacultyValidation,
  ),
  AcademicFeacultyControllers.academicFeacultyCreate,
);
// Get All Academic Feaculty
route.get(
  '/all-academic-feaculty',
  AcademicFeacultyControllers.getAllAcademicFeaculty,
);
// Get Single Academic Semester
route.get(
  '/:feacultyId',
  AcademicFeacultyControllers.getSingleAcademicFeaculty,
);

// Update Single Academic Feaculty
route.patch(
  '/:feacultyId',
  validateRequest(
    academicFacultyValidationSchemas.updateAcademicFacultyValidation,
  ),
  AcademicFeacultyControllers.updateSingleAcademicFeacultyControllers,
);

export const academicFeacultyRoutes = route;
