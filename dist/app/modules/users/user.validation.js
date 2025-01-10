"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("./user.constant");
const userSchemaWithZod = zod_1.default.object({
    password: zod_1.default
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .max(20, { message: 'Password more then 20 Character not Allow' })
        .min(6, { message: 'Password write minium 6 Character' }),
});
// User Status Change Validation Schemas
const userStatusChangeValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum([...user_constant_1.user_status]),
    }),
});
exports.UserValidationSchemas = {
    userSchemaWithZod,
    userStatusChangeValidationSchema,
};
