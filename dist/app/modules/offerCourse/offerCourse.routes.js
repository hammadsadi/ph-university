"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offerCourse_validation_1 = require("./offerCourse.validation");
const offerCourse_controllers_1 = require("./offerCourse.controllers");
const authChecking_1 = __importDefault(require("../../middlewares/authChecking"));
const user_constant_1 = require("../users/user.constant");
// Route init
const route = (0, express_1.Router)();
// Create Offer Course
route.post('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(offerCourse_validation_1.OfferCourseValidationSchemas.createOfferCourseValidationSchema), offerCourse_controllers_1.OfferCourseCOntrollers.createOfferCourse);
// Get All Offered Course
route.get('/', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty), offerCourse_controllers_1.OfferCourseCOntrollers.getOfferCourse);
// Get My Offered Courses
route.get('/my-offered-courses', (0, authChecking_1.default)(user_constant_1.USER_ROLE.student), offerCourse_controllers_1.OfferCourseCOntrollers.myOfferCourse);
// Get Single Offered Course
route.get('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), offerCourse_controllers_1.OfferCourseCOntrollers.getSingleOfferCourse);
// Updated Offered Course
route.patch('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(offerCourse_validation_1.OfferCourseValidationSchemas.updateOfferCourseValidationSchema), offerCourse_controllers_1.OfferCourseCOntrollers.updatedOfferCourse);
// Delete Offered Course
route.delete('/:id', (0, authChecking_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), offerCourse_controllers_1.OfferCourseCOntrollers.deleteOfferCourse);
exports.OfferCourseRoutes = route;
