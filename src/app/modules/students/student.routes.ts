import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';
// Route init
const route = Router();

// Get All Student
route.get(
  '/all-students',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentsControllers.getAllStudents,
);
route.get(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentsControllers.getSingleStudent,
);
route.patch(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidationSchemas.updateValidationStudentSchema),
  StudentsControllers.updateSingleStudent,
);
route.delete(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentsControllers.deleteSingleStudent,
);

export const StudentsRoutes = route;
