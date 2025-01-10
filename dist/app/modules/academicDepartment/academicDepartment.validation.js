"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidationSchemas = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Faculty Must be String',
            required_error: 'Academic Department Name is Required!',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic Feaculty is Required!',
        }),
    }),
});
const updateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Academic Faculty Must be String',
            required_error: 'Academic Department is Required!',
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            required_error: 'Academic Feaculty is Required!',
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidationSchemas = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation,
};
