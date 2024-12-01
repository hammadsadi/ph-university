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

export const academicSemesterRoutes = route;
