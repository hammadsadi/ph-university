import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidationSchemas } from './academic.faculty.validation';
import { AcademicFeacultyControllers } from './academic.feaculty.controllers';

// Route init
const route = Router();

// Create Feaculty
route.post(
  '/create-academic-feaculty',
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
