"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_controllers_1 = require("./faculty.controllers");
const faculty_validation_1 = require("./faculty.validation");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Get All Student
route.get('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.superAdmin), faculty_controllers_1.FacultyControllers.getAllFaculty);
route.get('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.superAdmin), faculty_controllers_1.FacultyControllers.getSingleFaculty);
route.patch('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(faculty_validation_1.FacultyValidationSchemas.updateFacultyValidationSchema), faculty_controllers_1.FacultyControllers.updateSingleFaculty);
route.delete('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), faculty_controllers_1.FacultyControllers.deleteSingleFaculty);
exports.FacultyRoutes = route;
