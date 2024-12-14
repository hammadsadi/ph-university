import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchemas } from './auth.validation';
import { AuthControllers } from './auth.controllers';

// Route init
const route = Router();

// Login
route.post(
  '/login',
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = route;
