"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionSemesterValidationSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
const admission_semester_constant_1 = require("./admission.semester.constant");
const createAdmissionSemesterValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...admission_semester_constant_1.admissionSemesterName]),
        code: zod_1.default.enum([...admission_semester_constant_1.admissionSemesterCode]),
        year: zod_1.default.string(),
        startMonth: zod_1.default.enum([...admission_semester_constant_1.admissionSemesterMonts]),
        endMonth: zod_1.default.enum([...admission_semester_constant_1.admissionSemesterMonts]),
    }),
});
const updateAdmissionSemesterValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .enum([...admission_semester_constant_1.admissionSemesterName])
            .optional(),
        code: zod_1.default
            .enum([...admission_semester_constant_1.admissionSemesterCode])
            .optional(),
        year: zod_1.default.string().optional(),
        startMonth: zod_1.default
            .enum([...admission_semester_constant_1.admissionSemesterMonts])
            .optional(),
        endMonth: zod_1.default
            .enum([...admission_semester_constant_1.admissionSemesterMonts])
            .optional(),
    }),
});
exports.admissionSemesterValidationSchemas = {
    createAdmissionSemesterValidation,
    updateAdmissionSemesterValidation,
};
