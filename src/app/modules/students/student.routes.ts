import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);
route.get('/:id', StudentsControllers.getSingleStudent);
route.patch(
  '/:id',
  validateRequest(studentValidationSchemas.updateValidationStudentSchema),
  StudentsControllers.updateSingleStudent,
);
route.delete('/:id', StudentsControllers.deleteSingleStudent);

export const StudentsRoutes = route;
