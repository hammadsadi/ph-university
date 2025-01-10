"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchemas = void 0;
const zod_1 = require("zod");
// Login Validation Schema
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id Is Required!' }),
        password: zod_1.z.string({ required_error: 'Password Is Required!' }),
    }),
});
// User Password Change Schema
const passwordChangeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old Password Is Required!' }),
        newPassword: zod_1.z.string({ required_error: 'New Password Is Required!' }),
    }),
});
// Refresh Token Validation Schema
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: ' Refresh Token is Required!',
        }),
    }),
});
// Forget assword Validation Schema
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'User Id Is Required...!' }),
    }),
});
// Reset Password Validation Schema
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'User Id Is Required...!' }),
        newPassword: zod_1.z.string({ required_error: 'User Password Is Required...!' }),
    }),
});
exports.AuthValidationSchemas = {
    loginValidationSchema,
    passwordChangeValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
