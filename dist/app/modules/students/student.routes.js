"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsRoutes = void 0;
const express_1 = require("express");
const student_controllers_1 = require("./student.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Get All Student
route.get('/all-students', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), student_controllers_1.StudentsControllers.getAllStudents);
route.get('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty), student_controllers_1.StudentsControllers.getSingleStudent);
route.patch('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(student_validation_1.studentValidationSchemas.updateValidationStudentSchema), student_controllers_1.StudentsControllers.updateSingleStudent);
route.delete('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), student_controllers_1.StudentsControllers.deleteSingleStudent);
exports.StudentsRoutes = route;
