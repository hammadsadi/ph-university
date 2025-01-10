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
exports.AcademicFeacultyControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academic_faculty_services_1 = require("./academic.faculty.services");
/**
 * @Description  Create Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const academicFeacultyCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_services_1.AcademicFacultyServices.academicFacultySaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Academic Feaculty Created Successful',
        data: result,
    });
}));
/**
 * @Description  Get All Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllAcademicFeaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_services_1.AcademicFacultyServices.getAllAcademicFeacultyFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Academic Feaculty Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSingleAcademicFeaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_services_1.AcademicFacultyServices.getSingleAcademicFeacultyFromDB(req.params.feacultyId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Academic Feaculty Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Academic Feaculty Controller
 * @param feacultyId
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleAcademicFeacultyControllers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_faculty_services_1.AcademicFacultyServices.updateSingleAcademicFeacultyFromDB(req.params.feacultyId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Academic Feaculty Updated Successful',
        data: result,
    });
}));
exports.AcademicFeacultyControllers = {
    academicFeacultyCreate,
    getAllAcademicFeaculty,
    getSingleAcademicFeaculty,
    updateSingleAcademicFeacultyControllers,
};
