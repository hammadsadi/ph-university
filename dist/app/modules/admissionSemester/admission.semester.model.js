"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionSemester = void 0;
const mongoose_1 = require("mongoose");
const admission_semester_constant_1 = require("./admission.semester.constant");
const admissionSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: admission_semester_constant_1.admissionSemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: admission_semester_constant_1.admissionSemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: admission_semester_constant_1.admissionSemesterMonts,
        required: true,
    },
    endMonth: {
        type: String,
        enum: admission_semester_constant_1.admissionSemesterMonts,
        required: true,
    },
}, {
    timestamps: true,
});
// Check Data Exist or Not Using Hook
admissionSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.AdmissionSemester.findOne({
            name: this.name,
            year: this.year,
        });
        // Validation
        if (isExist) {
            throw new Error('Semester Already Exist!');
        }
        next();
    });
});
exports.AdmissionSemester = (0, mongoose_1.model)('AdmissionSemester', admissionSemesterSchema);
