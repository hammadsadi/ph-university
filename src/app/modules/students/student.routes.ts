import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);
route.get('/:studentId', StudentsControllers.getSingleStudent);
route.delete('/:studentId', StudentsControllers.deleteSingleStudent);

export const StudentsRoutes = route;
