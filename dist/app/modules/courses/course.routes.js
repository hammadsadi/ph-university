"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const course_controllers_1 = require("./course.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
route.post('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(course_validation_1.CourseValidationSchemas.createCourseValidationSchema), course_controllers_1.CourseControllers.createCourse);
route.get('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.superAdmin), course_controllers_1.CourseControllers.getAllCourses);
route.get('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.superAdmin), course_controllers_1.CourseControllers.getSingleCourse);
route.put('/:courseId/assign-faculties', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(course_validation_1.CourseValidationSchemas.assignCourseWithFacultiesValidationSchema), course_controllers_1.CourseControllers.assignFacultiesWuthCourse);
route.get('/:courseId/get-faculties', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), course_controllers_1.CourseControllers.getFacultiesWithCourse);
route.delete('/:courseId/remove-faculties', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(course_validation_1.CourseValidationSchemas.assignCourseWithFacultiesValidationSchema), course_controllers_1.CourseControllers.removeFacultiesFromCourse);
route.patch('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(course_validation_1.CourseValidationSchemas.updateCourseValidationSchema), course_controllers_1.CourseControllers.updateSingleCourse);
route.delete('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), course_controllers_1.CourseControllers.deleteSingleCourse);
exports.CourseRoutes = route;
