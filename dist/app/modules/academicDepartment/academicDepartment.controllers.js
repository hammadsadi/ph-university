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
exports.AcademicDepartmentControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicDepartment_services_1 = require("./academicDepartment.services");
/**
 * @Description  Create Academic Academic Department
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const academicDepartmentCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.academicDepartmentSaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Academic Department Created Successful',
        data: result,
    });
}));
/**
 * @Description  Get All Academic Department
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Academic Department Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Academic Department
 * @param departmentId
 * @returns Response with data
 * @Method GET
 */
const getSingleAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(req.params.departmentId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Academic Department Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Academic Department
 * @param departmentId
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleAcademicDepartment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.updateSingleAcademicDepartmentFromDB(req.params.departmentId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Academic Department Updated Successful',
        data: result,
    });
}));
exports.AcademicDepartmentControllers = {
    academicDepartmentCreate,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment,
};
