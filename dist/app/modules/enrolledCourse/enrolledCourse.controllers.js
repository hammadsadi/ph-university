"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
exports.EnrolledCourseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const enrolledCourses_services_1 = require("./enrolledCourses.services");
/**
 * @Description  Create Enrolled Course
 * @param '
 * @returns Response with data
 * @Method POST
 */
const createEnrolledCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield enrolledCourses_services_1.EnrolledCourseServices.saveEnrolledCourseToDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Course Enrolled Successful',
        data: result,
    });
}));
/**
 * @Description  Update Enrolled Course Marks
 * @param '
 * @returns Response with data
 * @Method POST
 */
const updateEnrolledCourseMarks = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const facultyId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield enrolledCourses_services_1.EnrolledCourseServices.updateEnrolledCourseMarksFromDB(facultyId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Course Enrolled Marks Updated Successful!',
        data: result,
    });
}));
/**
 * @Description  Get All Enrolled Course From DB
 * @param '
 * @returns Response with data
 * @Method GET
 */
const getAllEnrolledCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourses_services_1.EnrolledCourseServices.getAllEnrolledCourseFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'All Enrolled Course Get Successful!',
        data: result,
    });
}));
exports.EnrolledCourseControllers = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
    getAllEnrolledCourse,
};
