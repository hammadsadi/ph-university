"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semester_register_constant_1 = require("./semester.register.constant");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AdmissionSemester',
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: semester_register_constant_1.semesterRegistrationtatus,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCradit: {
        type: Number,
        default: 3,
    },
    maxCradit: {
        type: Number,
        default: 15,
    },
}, {
    timestamps: true,
});
exports.SemesterRegistration = (0, mongoose_1.model)('SemesterRegistration', semesterRegistrationSchema);
