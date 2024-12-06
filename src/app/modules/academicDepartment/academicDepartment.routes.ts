import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidationSchemas } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';

// Route init
const route = Router();

// Create Academic Department
route.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidationSchemas.createAcademicDepartmentValidation,
  // ),
  AcademicDepartmentControllers.academicDepartmentCreate,
);
// Get All Academic Department
route.get(
  '/all-academic-department',
  AcademicDepartmentControllers.getAllAcademicDepartment,
);
// Get Single Academic Department
route.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

// Update Single Academic Department
route.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidationSchemas.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const academicDepartmentRoutes = route;
