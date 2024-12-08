import { Router } from 'express';
import { AdminControllers } from './admin.controllers';
import { AdminValidationSchemas } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';

// Route init
const route = Router();

// Get All Student
route.get('/', AdminControllers.getAllAdmin);
route.get('/:adminId', AdminControllers.getSingleAdmin);
route.patch(
  '/:adminId',
  validateRequest(AdminValidationSchemas.updateValidationAdminSchema),
  AdminControllers.updateSingleAdmin,
);
route.delete('/:adminId', AdminControllers.deleteSingleAdmin);

export const AdminRoutes = route;
