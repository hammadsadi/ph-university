import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidationSchemas } from './faculty.validation';
import authChecking from '../../middlewares/authChecking';
// Route init
const route = Router();

// Get All Student
route.get('/', authChecking(), FacultyControllers.getAllFaculty);
route.get('/:id', FacultyControllers.getSingleFaculty);
route.patch(
  '/:id',
  validateRequest(FacultyValidationSchemas.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
route.delete('/:id', FacultyControllers.deleteSingleFaculty);

export const FacultyRoutes = route;
