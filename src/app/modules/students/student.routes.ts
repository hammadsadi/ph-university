import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);
route.get('/:studentId', StudentsControllers.getSingleStudent);
route.patch(
  '/:studentId',
  validateRequest(studentValidationSchemas.updateValidationStudentSchema),
  StudentsControllers.updateSingleStudent,
);
route.delete('/:studentId', StudentsControllers.deleteSingleStudent);

export const StudentsRoutes = route;
