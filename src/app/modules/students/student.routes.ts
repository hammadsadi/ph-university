import { Router } from 'express';
import { StudentsControllers } from './student.controllers';
// Route init
const route = Router();

// Get All Student
route.get('/all-students', StudentsControllers.getAllStudents);

export const StudentsRoutes = route;
