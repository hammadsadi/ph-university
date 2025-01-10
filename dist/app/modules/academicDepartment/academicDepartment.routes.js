"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controllers_1 = require("./academicDepartment.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Academic Department
route.post('/create-academic-department', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidationSchemas.createAcademicDepartmentValidation), academicDepartment_controllers_1.AcademicDepartmentControllers.academicDepartmentCreate);
// Get All Academic Department
route.get('/all-academic-department', academicDepartment_controllers_1.AcademicDepartmentControllers.getAllAcademicDepartment);
// Get Single Academic Department
route.get('/:departmentId', academicDepartment_controllers_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
// Update Single Academic Department
route.patch('/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidationSchemas.updateAcademicDepartmentValidation), academicDepartment_controllers_1.AcademicDepartmentControllers.updateSingleAcademicDepartment);
exports.academicDepartmentRoutes = route;
