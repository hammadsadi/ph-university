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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../users/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
/**
 *@Description Login User
 @Method POST
 */
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check User
    const user = yield user_model_1.User.isUserExistCustomId(payload.id);
    if (!user) {
        throw new AppError_1.default(400, 'User Not Found!');
    }
    // Check User Is Deleted Or Not
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(400, 'User Not Found Bacuase User is Deleted!');
    }
    // Check User Status Block Or Not
    if ((user === null || user === void 0 ? void 0 : user.status) === 'block') {
        throw new AppError_1.default(400, 'User Blocked!');
    }
    // Check Password
    if (!(yield user_model_1.User.isCheckPassword(payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(403, 'Password Do Not Match!');
    }
    // Generate Access Token
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // Generate Access Token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.access_token_experies_in);
    // Generate Refresh Token
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_token, config_1.default.refresh_token_experies_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
/**
 *@Description User Password Change
 @Method POST
 */
const userPasswordChang = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check User
    const user = yield user_model_1.User.isUserExistCustomId(userData.userId);
    if (!user) {
        throw new AppError_1.default(400, 'User Not Found!');
    }
    // Check User Is Deleted Or Not
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(400, 'User Not Found Bacuase User is Deleted!');
    }
    // Check User Status Block Or Not
    if ((user === null || user === void 0 ? void 0 : user.status) === 'block') {
        throw new AppError_1.default(400, 'User Blocked!');
    }
    // Check Password
    if (!(yield user_model_1.User.isCheckPassword(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(403, 'Password Do Not Match!');
    }
    // Has New Password
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_solr_round));
    yield user_model_1.User.findOneAndUpdate({ id: userData.userId }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    }, { new: true });
    return null;
});
/**
 *@Description Generate Token
 @Method POST
 */
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // invalid token
    const decoded = (0, auth_utils_1.tokenVerify)(token, config_1.default.jwt_refresh_token);
    const { userId, iat } = decoded;
    // Check User
    const user = yield user_model_1.User.isUserExistCustomId(userId);
    if (!user) {
        throw new AppError_1.default(400, 'User Not Found!');
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
    // Generate Access Token
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // Generate Access Token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.access_token_experies_in);
    return { accessToken };
});
/**
 *@Description Forget Password
 @Method POST
 */
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check User
    const user = yield user_model_1.User.isUserExistCustomId(userId);
    if (!user) {
        throw new AppError_1.default(400, 'User Not Found!');
    }
    // Check User Is Deleted Or Not
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(400, 'User Not Found Bacuase User is Deleted!');
    }
    // Check User Status Block Or Not
    if ((user === null || user === void 0 ? void 0 : user.status) === 'block') {
        throw new AppError_1.default(400, 'User Blocked!');
    }
    // Generate Access Token
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // Generate Access Token
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, '10m');
    const resetLink = `${config_1.default.client_base_url}?id=${user === null || user === void 0 ? void 0 : user.id}&token=${resetToken}`;
    const to = user === null || user === void 0 ? void 0 : user.email;
    const sub = 'Password Reset Request 🗝️';
    const eText = `Dear ${user === null || user === void 0 ? void 0 : user.role},
We have received a request to reset your password for your account. If you did not make this request, please disregard this email.

To reset your password, please click the following link:
${resetLink}

If you need any assistance or have any questions, feel free to reach out to our support team.

Thank you for being a valued member of the PH Islamic University community.

Best regards,
The PH Islamic University Team
devteamsaadi@gmail.com`;
    const eHtml = `<html>
    <body>
      <p>Dear ${user === null || user === void 0 ? void 0 : user.role},</p>

      <p>We have received a request to reset your password for your account. If you did not make this request, please disregard this email.</p>

      <p>To reset your password, click the link below:</p>
      
      <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; cursor: pointer;">Reset My Password</a></p>

      <p>If you need any assistance or have any questions, please don’t hesitate to contact our support team at devteamsaadi@gmail.com.</p>

      <p>Thank you for being a valued member of the PH University community.</p>

      <p>Best regards,<br>The PH University Team</p>

      <footer>
        <p style="font-size: 12px; color: gray;">If you did not request a password reset, please ignore this email. For support, contact us at devteamsaadi@gmail.com.</p>
        <p style="font-size: 10px; color: gray;">+8801760170010</p>
      </footer>
    </body>
  </html>`;
    (0, sendEmail_1.sendEmail)(to, sub, eText, eHtml);
});
/**
 *@Description Reset Password
 @Method POST
 */
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // Check User
    const user = yield user_model_1.User.isUserExistCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppError_1.default(400, 'User Not Found!');
    }
    // Check User Is Deleted Or Not
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(400, 'User Not Found Bacuase User is Deleted!');
    }
    // Check User Status Block Or Not
    if ((user === null || user === void 0 ? void 0 : user.status) === 'block') {
        throw new AppError_1.default(400, 'User Blocked!');
    }
    // Check token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token);
    // Check User Id
    if ((decoded === null || decoded === void 0 ? void 0 : decoded.userId) !== payload.id) {
        throw new AppError_1.default(403, 'You are forbidden!');
    }
    // Has New Password
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_solr_round));
    yield user_model_1.User.findOneAndUpdate({ id: decoded.userId, role: decoded === null || decoded === void 0 ? void 0 : decoded.role }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    }, { new: true });
});
exports.AuthServices = {
    userLogin,
    userPasswordChang,
    refreshToken,
    forgetPassword,
    resetPassword,
};
