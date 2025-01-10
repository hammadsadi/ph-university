"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFeacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academic_faculty_validation_1 = require("./academic.faculty.validation");
const academic_feaculty_controllers_1 = require("./academic.feaculty.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Feaculty
route.post('/create-academic-feaculty', (0, authChecking_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(academic_faculty_validation_1.academicFacultyValidationSchemas.createAcademicFacultyValidation), academic_feaculty_controllers_1.AcademicFeacultyControllers.academicFeacultyCreate);
// Get All Academic Feaculty
route.get('/all-academic-feaculty', academic_feaculty_controllers_1.AcademicFeacultyControllers.getAllAcademicFeaculty);
// Get Single Academic Semester
route.get('/:feacultyId', academic_feaculty_controllers_1.AcademicFeacultyControllers.getSingleAcademicFeaculty);
// Update Single Academic Feaculty
route.patch('/:feacultyId', (0, validateRequest_1.default)(academic_faculty_validation_1.academicFacultyValidationSchemas.updateAcademicFacultyValidation), academic_feaculty_controllers_1.AcademicFeacultyControllers.updateSingleAcademicFeacultyControllers);
exports.academicFeacultyRoutes = route;
