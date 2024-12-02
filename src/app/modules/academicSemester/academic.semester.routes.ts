import { Router } from 'express';
import { AcademicSemesterControllers } from './academic.semester.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidationSchemas } from './academic.semester.validation';

// Route init
const route = Router();

// Create Semester
route.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidationSchemas.createAcadimicSemesterValidation,
  ),
  AcademicSemesterControllers.academicSemesterCreate,
);
// Get All Academic Semester
route.get(
  '/all-academic-semester',
  AcademicSemesterControllers.academicSemesterGetAllController,
);
// Get Single Academic Semester
route.get(
  '/:semesterId',
  AcademicSemesterControllers.academicSemesterGetSingleController,
);

// Update Single Academic Semester
route.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidationSchemas.updateAcadimicSemesterValidation,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemesterControllers,
);

export const academicSemesterRoutes = route;
