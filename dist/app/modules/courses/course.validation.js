"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidationSchemas = void 0;
const zod_1 = require("zod");
// Create Pre Requisite Course Validation Schema
const createPreRequisiteValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
// Update Pre Requisite Course Validation Schema
const updatePreRequisiteValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
// Create Course Validation Schema
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        preRequisiteCourses: zod_1.z.array(createPreRequisiteValidationSchema).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// Update Course Validation Schema
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        preRequisiteCourses: zod_1.z.array(updatePreRequisiteValidationSchema).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// Assign Course with Faculties Validation Schema
const assignCourseWithFacultiesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.CourseValidationSchemas = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    assignCourseWithFacultiesValidationSchema,
};
