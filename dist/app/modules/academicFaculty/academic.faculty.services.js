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
exports.AcademicFacultyServices = void 0;
const academic_faculty_model_1 = require("./academic.faculty.model");
// Create New Academic Feaculty
const academicFacultySaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create Academic Faculty
    const result = yield academic_faculty_model_1.AcademicFaculty.create(payload);
    return result;
});
// Get All Academic Feaculty
const getAllAcademicFeacultyFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get All Academic Feaculty
    const result = yield academic_faculty_model_1.AcademicFaculty.find();
    return result;
});
// Get Single Academic Feaculty
const getSingleAcademicFeacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get Single Academic Feaculty
    const result = yield academic_faculty_model_1.AcademicFaculty.findById(id);
    return result;
});
// Updated Single Academic Feaculty
const updateSingleAcademicFeacultyFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Fine and Update Semester
    const result = yield academic_faculty_model_1.AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AcademicFacultyServices = {
    academicFacultySaveToDB,
    getAllAcademicFeacultyFromDB,
    getSingleAcademicFeacultyFromDB,
    updateSingleAcademicFeacultyFromDB,
};
