"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseValidationSchemas = void 0;
const zod_1 = require("zod");
const offerCourse_contant_1 = require("./offerCourse.contant");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const timeRegex = /^(?:[1-9]|1\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
}, {
    message: 'Invalid Time Format Expected "HH:MM" in 24 Houes Format',
});
const createOfferCourseValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string(),
        academicFecaulty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offerCourse_contant_1.Days])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start Time Should be Before End Time!',
    }),
});
const updateOfferCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offerCourse_contant_1.Days])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    }),
});
exports.OfferCourseValidationSchemas = {
    createOfferCourseValidationSchema,
    updateOfferCourseValidationSchema,
};
