"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionSemesterRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admission_semester_validation_1 = require("./admission.semester.validation");
const academic_semester_controllers_1 = require("./academic.semester.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Semester
route.post('/create-admission-semester', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(admission_semester_validation_1.admissionSemesterValidationSchemas.createAdmissionSemesterValidation), academic_semester_controllers_1.AdmissionSemesterControllers.admissionSemesterCreate);
// Get All Admission Semester
route.get('/all-admission-semester', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academic_semester_controllers_1.AdmissionSemesterControllers.admissionSemesterGetAllController);
// Get Single Admission Semester
route.get('/:semesterId', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academic_semester_controllers_1.AdmissionSemesterControllers.admissionSemesterGetSingleController);
// Update Single Admission Semester
route.patch('/:semesterId', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(admission_semester_validation_1.admissionSemesterValidationSchemas.updateAdmissionSemesterValidation), academic_semester_controllers_1.AdmissionSemesterControllers.updateSingleAdmissionSemesterControllers);
exports.AdmissionSemesterRoutes = route;
