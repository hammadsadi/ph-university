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
exports.AdmissioncSemesterServices = void 0;
const admission_semester_constant_1 = require("./admission.semester.constant");
const admission_semester_model_1 = require("./admission.semester.model");
// Create New Academic Semester
const admissionSemesterSaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Semeser Code Valid or invalid
    if (admission_semester_constant_1.admissionSemesterNameCode[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code!');
    }
    // Create Semester
    const result = yield admission_semester_model_1.AdmissionSemester.create(payload);
    return result;
});
// Get All Admission Semester
const getAllAdmissionSemesterToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get All Semester
    const result = yield admission_semester_model_1.AdmissionSemester.find();
    return result;
});
// Get Single Admission Semester
const getSingleAdmissionSemesterToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get Single Semester
    const result = yield admission_semester_model_1.AdmissionSemester.findById(id);
    return result;
});
// Updated Single Admission Semester
const updateSingleAdmissionSemesterToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Validation
    if (payload.name &&
        payload.code &&
        admission_semester_constant_1.admissionSemesterNameCode[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    // Fine and Update Semester
    const result = yield admission_semester_model_1.AdmissionSemester.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AdmissioncSemesterServices = {
    admissionSemesterSaveToDB,
    getAllAdmissionSemesterToDB,
    getSingleAdmissionSemesterToDB,
    updateSingleAdmissionSemesterToDB,
};
