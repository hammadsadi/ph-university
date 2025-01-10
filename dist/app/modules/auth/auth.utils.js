"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (jwtPayload, seret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, seret, {
        expiresIn,
    });
};
exports.createToken = createToken;
const tokenVerify = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.tokenVerify = tokenVerify;
