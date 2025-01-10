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
exports.StudentsControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const student_service_1 = require("./student.service");
/**
 * Get All Students
 */
const getAllStudents = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getAllStudentFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Students Get Successful',
        data: result,
    });
}));
/**
 * Get Single Student
 */
const getSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getSingleStudentFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Srudent Get Successful',
        data: result,
    });
}));
/**
 * Update Single Student
 */
const updateSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { student } = req.body;
    const result = yield student_service_1.StudentServices.updateSingleStudentFromDB(id, student);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Student Updated Successful',
        data: result,
    });
}));
/**
 * Update Single Student
 */
const deleteSingleStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.deleteSingleStudentFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Student Deleted Successful',
        data: result,
    });
}));
exports.StudentsControllers = {
    getAllStudents,
    getSingleStudent,
    updateSingleStudent,
    deleteSingleStudent,
};
