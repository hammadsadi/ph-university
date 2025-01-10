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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    passwordChangedAt: {
        type: Date,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['superAdmin', 'student', 'faculty', 'admin'],
        required: true,
    },
    status: {
        type: String,
        enum: user_constant_1.user_status,
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Example of pre for password saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = this;
        userInfo.password = yield bcrypt_1.default.hash(userInfo.password, Number(config_1.default.bcrypt_solr_round));
        next();
    });
});
// Example of post for password empty
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// Static For User Validation
userSchema.statics.isUserExistCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ id }).select('+password');
    });
};
// Static for User Password Check
userSchema.statics.isCheckPassword = function (myPlaintextPassword, hashPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(myPlaintextPassword, hashPass);
    });
};
// Password Change and Jwt Time Stamp Issue Tracking for Account More Secure
userSchema.statics.isJwtIssuedBeforePasswordChanged = function (passwordChangedTimeStamp, jwtIssuedTimeStamp) {
    const passwordChangedTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimeStamp;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
