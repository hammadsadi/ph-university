import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchemas } from './auth.validation';
import { AuthControllers } from './auth.controllers';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

// Login
route.post(
  '/login',
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthControllers.loginUser,
);

// Change Password
route.post(
  '/change-password',
  authChecking(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidationSchemas.passwordChangeValidationSchema),
  AuthControllers.changeUserPassword,
);

// Refresh Token
route.post(
  '/refresh-token',
  validateRequest(AuthValidationSchemas.refreshTokenValidationSchema),
  AuthControllers.refreshTokenControllers,
);

// Forget Password
route.post(
  '/forget-password',
  validateRequest(AuthValidationSchemas.forgetPasswordValidationSchema),
  AuthControllers.forgetPasswordControllers,
);
export const AuthRoutes = route;
