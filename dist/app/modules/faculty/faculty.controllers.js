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
exports.FacultyControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const faculty_services_1 = require("./faculty.services");
/**
 * @Description  Get All Faculty
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_services_1.FacultyServices.getAllFacultyFromDB(req.query);
    console.log(req.cookies);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Faculty Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Faculty
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSingleFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_services_1.FacultyServices.getSingleFacultyFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Faculty Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Faculty
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_services_1.FacultyServices.updateSingleFacultyFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Faculty Updated Successful',
        data: result,
    });
}));
/**
 * @Description  Delete Single Faculty
 * @param ''
 * @returns Response with data
 * @Method DELETE
 */
const deleteSingleFaculty = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_services_1.FacultyServices.deleteSingleFacultyFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Faculty Deleted Successful',
        data: result,
    });
}));
exports.FacultyControllers = {
    getAllFaculty,
    getSingleFaculty,
    updateSingleFaculty,
    deleteSingleFaculty,
};
