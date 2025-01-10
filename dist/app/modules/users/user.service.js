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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const student_mode_1 = require("../students/student.mode");
const user_utils_1 = require("./user.utils");
const admission_semester_model_1 = require("../admissionSemester/admission.semester.model");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faculty_model_1 = require("../faculty/faculty.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const admin_model_1 = require("../admin/admin.model");
const uploadImageToCloudinary_1 = require("../../utils/uploadImageToCloudinary");
// User Save to DB
const userSaveToDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // Set User Data
    const userData = {};
    // Set Student Role
    userData.role = 'student';
    // Set Student Email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    userData.password = password || config_1.default.default_password;
    // Find  Admission Semester info
    const admissionSemester = yield admission_semester_model_1.AdmissionSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError_1.default(404, 'Admission Semester Not Found!');
    }
    // Find Department
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(404, 'Academic Department Not Found!');
    }
    // Set Academic Faculty Data
    payload.academicFaculty = academicDepartment.academicFaculty;
    // Init Session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Genare User ID
        userData.id = yield (0, user_utils_1.generatedId)(admissionSemester);
        // Create User ( Transaction 1 )
        const createdUser = yield user_model_1.User.create([userData], { session }); // Array Return
        // Validation
        if (!createdUser.length) {
            throw new AppError_1.default(400, 'Failed to Create User');
        }
        payload.id = createdUser[0].id;
        payload.user = createdUser[0]._id;
        // Check Image
        if (file) {
            const filePath = file === null || file === void 0 ? void 0 : file.path;
            const imgName = `${userData === null || userData === void 0 ? void 0 : userData.id}-${payload === null || payload === void 0 ? void 0 : payload.name.firstName}`;
            // Cloudinary Image Upload
            const profileImage = yield (0, uploadImageToCloudinary_1.uploadImageToCloudinary)(imgName, filePath);
            // Set Image Url
            payload.profileImage = profileImage === null || profileImage === void 0 ? void 0 : profileImage.secure_url;
        }
        // Create Student
        const result = yield student_mode_1.Student.create([payload], { session }); //  Return Array
        // Validation
        if (!result.length) {
            throw new AppError_1.default(400, 'Failed to Create Student');
        }
        // Commot or Save Data
        yield session.commitTransaction();
        // End Session
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
/**
 *
 * @Desc Faculty Save to Database
 * @returns Data
 * @method POST
 */
const facultySaveToDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // User Data
    const userData = {};
    // Set Faculty Role
    userData.role = 'faculty';
    // Set Faculty Email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    // Set User Password
    userData.password = (payload === null || payload === void 0 ? void 0 : payload.password) || config_1.default.default_password;
    // Check Academic Department
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(404, 'Academic Department Not Found!');
    }
    payload.academicFaculty = academicDepartment.academicFaculty;
    // Start Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start Transaction
        session.startTransaction();
        // Generate Faculty Id
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        // Check File
        if (file) {
            const filePath = file === null || file === void 0 ? void 0 : file.path;
            const imgName = `${userData === null || userData === void 0 ? void 0 : userData.id}-${payload === null || payload === void 0 ? void 0 : payload.name.firstName}`;
            // Cloudinary Image Upload
            const profileImage = yield (0, uploadImageToCloudinary_1.uploadImageToCloudinary)(imgName, filePath);
            // Set Image Url
            payload.profileImage = profileImage === null || profileImage === void 0 ? void 0 : profileImage.secure_url;
        }
        // Create User
        const newsUser = yield user_model_1.User.create([userData], { session }); // Return Array
        // Check
        if (!newsUser.length) {
            throw new AppError_1.default(400, 'Failed To Create User!');
        }
        // Set Id and _id as a User
        payload.id = newsUser[0].id; // Gen Id
        payload.user = newsUser[0]._id; // Ref Id
        // Create Faculty
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session }); // It Return Array
        // Check
        if (!newFaculty) {
            throw new AppError_1.default(400, 'Failed To Create Faculty!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
/**
 *
 * @Desc Admin Save to Database
 * @returns Data
 * @method POST
 */
const adminSaveToDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // User Data
    const userData = {};
    // Set Admin Role
    userData.role = 'admin';
    // Set Admin Email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    // Set User Password
    userData.password = (payload === null || payload === void 0 ? void 0 : payload.password) || config_1.default.default_password;
    // Start Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start Transaction
        session.startTransaction();
        // Generate Faculty Id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // Check File
        if (file) {
            const filePath = file === null || file === void 0 ? void 0 : file.path;
            const imgName = `${userData === null || userData === void 0 ? void 0 : userData.id}-${payload === null || payload === void 0 ? void 0 : payload.name.firstName}`;
            // Cloudinary Image Upload
            const profileImage = yield (0, uploadImageToCloudinary_1.uploadImageToCloudinary)(imgName, filePath);
            // Set Image Url
            payload.profileImage = profileImage === null || profileImage === void 0 ? void 0 : profileImage.secure_url;
        }
        // Create User
        const newsUser = yield user_model_1.User.create([userData], { session }); // Return Array
        // Check
        if (!newsUser.length) {
            throw new AppError_1.default(400, 'Failed To Create User!');
        }
        // Set Id and _id as a User
        payload.id = newsUser[0].id; // Gen Id
        payload.user = newsUser[0]._id; // Ref Id
        // Create Admin
        const newAdmin = yield admin_model_1.Admin.create([payload], { session }); // It Return Array
        // Check
        if (!newAdmin) {
            throw new AppError_1.default(400, 'Failed To Create Admin!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
/**
 *
 * @Desc Get Me from Database
 * @returns Data
 * @method GET
 */
const getMeFromDb = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    // Check Role and Set Data
    if (role === 'student') {
        result = yield student_mode_1.Student.findOne({ id: userId })
            .populate('user')
            .populate('admissionSemester')
            .populate('academicDepartment');
    }
    // Check Role and Set Data
    if (role === 'admin') {
        result = yield admin_model_1.Admin.findOne({ id: userId }).populate('user');
    }
    // Check Role and Set Data
    if (role === 'faculty') {
        result = yield faculty_model_1.Faculty.findOne({ id: userId }).populate('user');
    }
    return result;
});
/**
 *
 * @Desc Update User Status From from Database
 * @returns Data
 * @method POST
 */
const userStatusUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.userServices = {
    userSaveToDB,
    facultySaveToDB,
    adminSaveToDB,
    getMeFromDb,
    userStatusUpdate,
};
