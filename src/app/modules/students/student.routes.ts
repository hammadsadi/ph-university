import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
import authChecking from '../../middlewares/authChecking';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);
route.get(
  '/:id',
  authChecking('admin', 'faculty'),
  StudentsControllers.getSingleStudent,
);
route.patch(
  '/:id',
  validateRequest(studentValidationSchemas.updateValidationStudentSchema),
  StudentsControllers.updateSingleStudent,
);
route.delete('/:id', StudentsControllers.deleteSingleStudent);

export const StudentsRoutes = route;
