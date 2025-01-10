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
exports.AdmissionSemesterControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admission_semester_services_1 = require("./admission.semester.services");
/**
 * Create Admission Semester Controller
 */
const admissionSemesterCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admission_semester_services_1.AdmissioncSemesterServices.admissionSemesterSaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admission Semester Created Successful',
        data: result,
    });
}));
/**
 * Get All Admission Semester Controller
 */
const admissionSemesterGetAllController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admission_semester_services_1.AdmissioncSemesterServices.getAllAdmissionSemesterToDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admission Semester Get Successful',
        data: result,
    });
}));
/**
 * Get Single Admission Semester Controller
 */
const admissionSemesterGetSingleController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admission_semester_services_1.AdmissioncSemesterServices.getSingleAdmissionSemesterToDB(req.params.semesterId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Admission Semester Get Successful',
        data: result,
    });
}));
/**
 * Update Single Admission Semester Controller
 */
const updateSingleAdmissionSemesterControllers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admission_semester_services_1.AdmissioncSemesterServices.updateSingleAdmissionSemesterToDB(req.params.semesterId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Admission Semester Updated Successful',
        data: result,
    });
}));
exports.AdmissionSemesterControllers = {
    admissionSemesterCreate,
    admissionSemesterGetAllController,
    admissionSemesterGetSingleController,
    updateSingleAdmissionSemesterControllers,
};
