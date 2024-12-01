import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../students/student.validation';

// Init Routes
const router = Router();

// Create Student Route
router.post(
  '/users/create-student',
  validateRequest(studentValidationSchemas.studentSchema),
  userControllers.userCreate,
);

export const userRoutes = router;
