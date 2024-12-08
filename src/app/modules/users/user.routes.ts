import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../students/student.validation';
import { FacultyValidationSchemas } from '../faculty/faculty.validation';
import { AdminValidationSchemas } from '../admin/admin.validation';

// Init Routes
const router = Router();

// Create Student Route
router.post(
  '/users/create-student',
  validateRequest(studentValidationSchemas.createValidationStudentSchema),
  userControllers.userCreate,
);
// Create Faculty Route
router.post(
  '/create-faculty',
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  userControllers.facultyCreate,
);
// Create Faculty Route
router.post(
  '/create-admin',
  validateRequest(AdminValidationSchemas.createValidationAdminSchema),
  userControllers.adminCreate,
);

export const userRoutes = router;
