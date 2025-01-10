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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_services_1 = require("./auth.services");
/**
 * @Description  Login User
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.userLogin(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Login Successful Successful',
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
}));
/**
 * @Description  Change Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const changeUserPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const result = yield auth_services_1.AuthServices.userPasswordChang(req.user, passwordData);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Password Changed Successful',
        data: result,
    });
}));
/**
 * @Description  Refresh Token
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const refreshTokenControllers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_services_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Refresh Token Retrived Successful',
        data: result,
    });
}));
/**
 * @Description  Forget Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const forgetPasswordControllers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    const result = yield auth_services_1.AuthServices.forgetPassword(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Reset Link Generated Successful',
        data: result,
    });
}));
/**
 * @Description  Reset Password
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const resetPasswordControllers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield auth_services_1.AuthServices.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Reset Password Successful',
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    changeUserPassword,
    refreshTokenControllers,
    forgetPasswordControllers,
    resetPasswordControllers,
};
