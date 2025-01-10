"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const semester_registration_validation_1 = require("./semester.registration.validation");
const semester_registration_controllers_1 = require("./semester.registration.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Semester Registration
route.post('/create-semester-registration', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(semester_registration_validation_1.SemesterRegistrationValidationSchemas.createSemesterRegistrationValidationSchema), semester_registration_controllers_1.SemesterRegisterControllers.createSemesterRegistration);
// Update Semester Registration
route.patch('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(semester_registration_validation_1.SemesterRegistrationValidationSchemas.updateSemesterRegistrationValidationSchema), semester_registration_controllers_1.SemesterRegisterControllers.updateSingleSemesterRegistration);
// Get All  Semester Register
route.get('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), semester_registration_controllers_1.SemesterRegisterControllers.getSemesterRegistration);
// Get Single Semester Registration
route.get('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), semester_registration_controllers_1.SemesterRegisterControllers.getSingleSemesterRegistration);
exports.SemesterRegistrationRoutes = route;
