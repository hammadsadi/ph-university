import { Router } from 'express';
import { AdminControllers } from './admin.controllers';
import { AdminValidationSchemas } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';

// Route init
const route = Router();

// Get All Student
route.get('/', AdminControllers.getAllAdmin);
route.get('/:id', AdminControllers.getSingleAdmin);
route.patch(
  '/:id',
  validateRequest(AdminValidationSchemas.updateValidationAdminSchema),
  AdminControllers.updateSingleAdmin,
);
route.delete('/:id', AdminControllers.deleteSingleAdmin);

export const AdminRoutes = route;
