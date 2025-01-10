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
exports.generateAdminId = exports.findLastAdminId = exports.generateFacultyId = exports.findLastFacultyId = exports.generatedId = void 0;
const user_model_1 = require("./user.model");
// Get Last User ID
const findLastUserentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = yield user_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id) ? lastUserId.id : undefined;
});
// Generated ID
const generatedId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // First Time Default ID
    let currentId = (0).toString();
    const lastStudentId = yield findLastUserentId();
    // Last Student Semester 2043010001
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentSemesterCode = payload === null || payload === void 0 ? void 0 : payload.code;
    const currentSemesterYear = payload === null || payload === void 0 ? void 0 : payload.year;
    // Check
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentSemesterYear === currentSemesterYear) {
        currentId = lastStudentId.substring(6);
    }
    // Increament Id
    let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
    increamentId = `${payload === null || payload === void 0 ? void 0 : payload.year}${payload === null || payload === void 0 ? void 0 : payload.code}${increamentId}`;
    return increamentId;
});
exports.generatedId = generatedId;
// Get Last Faculty ID
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({
        role: 'faculty',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
// Generate Faculty ID
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    // Last Faculty Id
    const lastFacultyId = yield (0, exports.findLastFacultyId)();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }
    let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
    increamentId = `F-${increamentId}`;
    return increamentId;
});
exports.generateFacultyId = generateFacultyId;
// Get Last Admin ID
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastadmin = yield user_model_1.User.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastadmin === null || lastadmin === void 0 ? void 0 : lastadmin.id) ? lastadmin.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
// Generate Admin ID
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    // Last Admin Id
    const lastAdminId = yield (0, exports.findLastAdminId)();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
    increamentId = `A-${increamentId}`;
    return increamentId;
});
exports.generateAdminId = generateAdminId;
