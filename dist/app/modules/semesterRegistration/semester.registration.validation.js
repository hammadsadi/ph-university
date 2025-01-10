"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationValidationSchemas = void 0;
const zod_1 = require("zod");
const semester_register_constant_1 = require("./semester.register.constant");
const createSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string(),
        status: zod_1.z.enum([...semester_register_constant_1.semesterRegistrationtatus]),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        minCradit: zod_1.z.number(),
        maxCradit: zod_1.z.number(),
    }),
});
const updateSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...semester_register_constant_1.semesterRegistrationtatus])
            .optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        minCradit: zod_1.z.number().optional(),
        maxCradit: zod_1.z.number().optional(),
    }),
});
exports.SemesterRegistrationValidationSchemas = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
};
