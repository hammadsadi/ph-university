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
exports.AcademicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
// Create New Academic Department
const academicDepartmentSaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create Academic Department
    const result = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return result;
});
// Get All Academic Department
const getAllAcademicDepartmentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get All Academic Department
    const result = yield academicDepartment_model_1.AcademicDepartment.find();
    return result;
});
// Get Single Academic Department
const getSingleAcademicDepartmentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get Single Academic Department
    const result = yield academicDepartment_model_1.AcademicDepartment.findById(id);
    return result;
});
// Updated Single Academic Department
const updateSingleAcademicDepartmentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and Update Academic Department
    const result = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.AcademicDepartmentServices = {
    academicDepartmentSaveToDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentFromDB,
};
