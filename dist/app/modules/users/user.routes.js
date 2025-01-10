"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("../students/student.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("./user.constant");
const user_validation_1 = require("./user.validation");
const uploadImageToCloudinary_1 = require("../../utils/uploadImageToCloudinary");
// Init Routes
const router = (0, express_1.Router)();
// Create Student Route
router.post('/create-student', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), uploadImageToCloudinary_1.uploadMulter.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_validation_1.studentValidationSchemas.createValidationStudentSchema), user_controllers_1.userControllers.userCreate);
// Create Faculty Route
router.post('/create-faculty', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), uploadImageToCloudinary_1.uploadMulter.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(faculty_validation_1.FacultyValidationSchemas.createFacultyValidationSchema), user_controllers_1.userControllers.facultyCreate);
// Create Admin Route
router.post('/create-admin', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), uploadImageToCloudinary_1.uploadMulter.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.AdminValidationSchemas.createValidationAdminSchema), user_controllers_1.userControllers.adminCreate);
// Update User Status
router.patch('/change-status/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(user_validation_1.UserValidationSchemas.userStatusChangeValidationSchema), user_controllers_1.userControllers.updateStatus);
// Create Faculty Route
router.get('/me', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.superAdmin), user_controllers_1.userControllers.getMe);
exports.userRoutes = router;
