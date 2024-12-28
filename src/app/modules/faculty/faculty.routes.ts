import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidationSchemas } from './faculty.validation';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';
// Route init
const route = Router();

// Get All Student
route.get(
  '/',
  authChecking(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  FacultyControllers.getAllFaculty,
);
route.get(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  FacultyControllers.getSingleFaculty,
);
route.patch(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(FacultyValidationSchemas.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
route.delete(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.deleteSingleFaculty,
);

export const FacultyRoutes = route;
