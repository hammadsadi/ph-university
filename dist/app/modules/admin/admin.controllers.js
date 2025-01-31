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
exports.AdminControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_services_1 = require("./admin.services");
/**
 * @Description  Get All Admin
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getAllAdminFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admin Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Admin
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSingleAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getSingleAdminFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admin Get Successful',
        data: result,
    });
}));
/**
 * @Description  Update Single Admin
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.updateSingleAdminFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Admin Updated Successful',
        data: result,
    });
}));
/**
 * @Description  Delete Single Admin
 * @param ''
 * @returns Response with data
 * @Method DELETE
 */
const deleteSingleAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.deleteSingleAdminFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Admin Deleted Successful',
        data: result,
    });
}));
exports.AdminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateSingleAdmin,
    deleteSingleAdmin,
};
