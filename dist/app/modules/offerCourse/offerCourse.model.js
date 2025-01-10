"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourse = void 0;
const mongoose_1 = require("mongoose");
const offerCourse_contant_1 = require("./offerCourse.contant");
const offerCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true,
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AdmissionSemester',
        required: true,
    },
    academicFecaulty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [
        {
            type: String,
            enum: offerCourse_contant_1.Days,
            required: true,
        },
    ],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.OfferCourse = (0, mongoose_1.model)('OfferCourse', offerCourseSchema);
