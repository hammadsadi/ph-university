import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../students/student.validation';
import { FacultyValidationSchemas } from '../faculty/faculty.validation';
import { AdminValidationSchemas } from '../admin/admin.validation';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from './user.constant';

// Init Routes
const router = Router();

// Create Student Route
router.post(
  '/create-student',
  authChecking(USER_ROLE.admin),
  validateRequest(studentValidationSchemas.createValidationStudentSchema),
  userControllers.userCreate,
);
// Create Faculty Route
router.post(
  '/create-faculty',
  authChecking(USER_ROLE.admin),
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  userControllers.facultyCreate,
);
// Create Faculty Route
router.post(
  '/create-admin',
  // authChecking(USER_ROLE.admin),
  validateRequest(AdminValidationSchemas.createValidationAdminSchema),
  userControllers.adminCreate,
);

export const userRoutes = router;
