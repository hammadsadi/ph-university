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
exports.userControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
/**
 * Create User Controller
 */
const userCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const result = yield user_service_1.userServices.userSaveToDB(password, student, req.file);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User Created Successful',
        data: result,
    });
}));
/**
 *
 * @Desc Faculty Controller
 * @returns Response with Data
 * @method POST
 */
const facultyCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.facultySaveToDB(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Faculty Created Successful',
        data: result,
    });
}));
/**
 *
 * @Desc Admin Controller
 * @returns Response with Data
 * @method POST
 */
const adminCreate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.adminSaveToDB(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admin Created Successful',
        data: result,
    });
}));
/**
 *
 * @Desc Me Controller
 * @returns Response with Data
 * @method GET
 */
const getMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield user_service_1.userServices.getMeFromDb(userId, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Loggedin User Data Fatch Successful',
        data: result,
    });
}));
/**
 *
 * @Desc Update User Status
 * @returns Response with Data
 * @method POST
 */
const updateStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.userServices.userStatusUpdate(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Status Updated Successful Successful',
        data: result,
    });
}));
exports.userControllers = {
    userCreate,
    facultyCreate,
    adminCreate,
    getMe,
    updateStatus,
};
