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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/users/user.model");
const authChecking = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // Token Check
        if (!token) {
            throw new AppError_1.default(401, 'You are not Authorized!');
        }
        // invalid token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token);
        // Check Role
        const { role, userId, iat } = decoded;
        // Check User
        const user = yield user_model_1.User.isUserExistCustomId(userId);
        if (!user) {
            throw new AppError_1.default(400, 'You are not Authorized!');
        }
        // Check User Is Deleted Or Not
        if (user === null || user === void 0 ? void 0 : user.isDeleted) {
            throw new AppError_1.default(400, 'User Not Found Bacuase User is Deleted!');
        }
        // Check User Status Block Or Not
        if ((user === null || user === void 0 ? void 0 : user.status) === 'block') {
            throw new AppError_1.default(400, 'User Blocked!');
        }
        // Tracking Password Change Date and Jwt Issue Date
        if (user.passwordChangedAt &&
            user_model_1.User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
            throw new AppError_1.default(401, 'You are not Authorized!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(401, 'You are not Authorized!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authChecking;
