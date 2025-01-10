"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const enrolledCourse_validation_1 = require("./enrolledCourse.validation");
const enrolledCourse_controllers_1 = require("./enrolledCourse.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Enroll Course
route.post('/create-enrolled-course', (0, authChecking_1.default)(user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(enrolledCourse_validation_1.EnrolledCourseValidationSchemas.createEnrolledCourseValidation), enrolledCourse_controllers_1.EnrolledCourseControllers.createEnrolledCourse);
// Update Enroll Course Marks
route.patch('/update-enrolled-course-marks', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(enrolledCourse_validation_1.EnrolledCourseValidationSchemas.updateCourseMarksValidation), enrolledCourse_controllers_1.EnrolledCourseControllers.updateEnrolledCourseMarks);
// Update Enroll Course Marks
route.get('/all-enrolled-courses', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.student), enrolledCourse_controllers_1.EnrolledCourseControllers.getAllEnrolledCourse);
exports.EnrolledCourseRoutes = route;
