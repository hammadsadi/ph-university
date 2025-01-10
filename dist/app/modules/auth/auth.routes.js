"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Login
route.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchemas.loginValidationSchema), auth_controllers_1.AuthControllers.loginUser);
// Change Password
route.post('/change-password', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchemas.passwordChangeValidationSchema), auth_controllers_1.AuthControllers.changeUserPassword);
// Refresh Token
route.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchemas.refreshTokenValidationSchema), auth_controllers_1.AuthControllers.refreshTokenControllers);
// Forget Password
route.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchemas.forgetPasswordValidationSchema), auth_controllers_1.AuthControllers.forgetPasswordControllers);
// Forget Password
route.post('/reset-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchemas.resetPasswordValidationSchema), auth_controllers_1.AuthControllers.resetPasswordControllers);
exports.AuthRoutes = route;
