import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);
route.get('/:studentId', StudentsControllers.getSingleStudent);

export const StudentsRoutes = route;
