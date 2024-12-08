import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../students/student.validation';
import { FacultyValidationSchemas } from '../faculty/faculty.validation';

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

export const userRoutes = router;
