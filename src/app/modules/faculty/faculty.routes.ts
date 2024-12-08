import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
// Route init
const route = Router();

// Get All Student
route.get('/', FacultyControllers.getAllFaculty);
// route.patch(
//   '/:studentId',
//   validateRequest(studentValidationSchemas.updateValidationStudentSchema),
//   StudentsControllers.updateSingleStudent,
// );

export const FacultyRoutes = route;
