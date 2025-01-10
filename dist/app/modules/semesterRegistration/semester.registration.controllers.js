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
exports.SemesterRegisterControllers = void 0;
const semester_registration_services_1 = require("./semester.registration.services");
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
/**
 * @Description  Create Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const createSemesterRegistration = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_registration_services_1.SemesterRegistrationServices.semesterRegistrationDataSaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Semester Registration Created Successful',
        data: result,
    });
}));
/**
 * @Description  GET All Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSemesterRegistration = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_registration_services_1.SemesterRegistrationServices.semesterRegistrationDataGetFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Semester Registration Get Successful',
        data: result,
    });
}));
/**
 * @Description  GET Single Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSingleSemesterRegistration = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_registration_services_1.SemesterRegistrationServices.singleSemesterRegistrationDataGetFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Semester Registration Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleSemesterRegistration = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_registration_services_1.SemesterRegistrationServices.singleSemesterRegistrationDataUpdateFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Semester Registration Updated Successful',
        data: result,
    });
}));
exports.SemesterRegisterControllers = {
    createSemesterRegistration,
    getSemesterRegistration,
    getSingleSemesterRegistration,
    updateSingleSemesterRegistration,
};
