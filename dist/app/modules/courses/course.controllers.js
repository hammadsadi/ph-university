"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_services_1 = require("./course.services");
/**
 * @Description  Create New Course
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const createCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.courseSaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Courses Created Successful',
        data: result,
    });
}));
/**
 * @Description  Assign Faculties with Course
 * @param courseId
 * @returns Response with data
 * @Method PUT
 */
const assignFacultiesWuthCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_services_1.CourseServices.assignFacultiesWithCoursesIntoDB(courseId, req.body.faculties);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Assigned Faculties With Coureses Successful',
        data: result,
    });
}));
/**
 * @Description  Remove Faculties From Course
 * @param courseId
 * @returns Response with data
 * @Method DELETE
 */
const removeFacultiesFromCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_services_1.CourseServices.removeFacultiesFromCoursesIntoDB(courseId, req.body.faculties);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Remove Faculties From Courese Successful',
        data: result,
    });
}));
/**
 * @Description  Get Faculties With Course
 * @param courseId
 * @returns Response with data
 * @Method Get
 */
const getFacultiesWithCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_services_1.CourseServices.getFacultiesWithCourseFromDB(courseId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Get Faculties With Courese Successful',
        data: result,
    });
}));
/**
 * @Description  Get All Course
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllCourses = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.getAllCourseFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Courses Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Course
 * @param id
 * @returns Response with data
 * @Method GET
 */
const getSingleCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.getSingleCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Course Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Course
 * @param id
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.updateSingleCourseFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Course Updated Successful',
        data: result,
    });
}));
/**
 * @Description  Delete Single Course
 * @param id
 * @returns Response with data
 * @Method DELETE
 */
const deleteSingleCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.deleteSingleCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Course Deleted Successful',
        data: result,
    });
}));
exports.CourseControllers = {
    getAllCourses,
    getSingleCourse,
    updateSingleCourse,
    deleteSingleCourse,
    createCourse,
    assignFacultiesWuthCourse,
    removeFacultiesFromCourse,
    getFacultiesWithCourse,
};
