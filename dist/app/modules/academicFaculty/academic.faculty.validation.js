"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidationSchemas = void 0;
const zod_1 = require("zod");
const createAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Faculty Must be String',
        }),
    }),
});
const updateAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Faculty Must be String',
        }),
    }),
});
exports.academicFacultyValidationSchemas = {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation,
};
