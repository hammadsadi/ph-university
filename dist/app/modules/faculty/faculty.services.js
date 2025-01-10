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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const faculty_model_1 = require("./faculty.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../users/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const faculty_constant_1 = require("./faculty.constant");
/**
 * @Description  Get All Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getAllFacultyFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find()
        .populate('user')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    }), query)
        .search(faculty_constant_1.FacujltySearchAbleFileds)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield facultyQuery.modelQuery;
    return result;
});
/**
 * @Description  Get Single Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id)
        .populate('user')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
});
/**
 * @Description  Update Single Feaculty
 * @param '
 * @returns Data
 * @Method PATCH
 */
const updateSingleFacultyFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, presentAddress, permanentAddress } = payload, remainingPayload = __rest(payload, ["name", "presentAddress", "permanentAddress"]);
    // Modefied Data
    const modefiedData = Object.assign({}, remainingPayload);
    // Check Name data
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modefiedData[`name.${key}`] = value;
        }
    }
    // Check Present Address data
    if (presentAddress && Object.keys(presentAddress).length) {
        for (const [key, value] of Object.entries(presentAddress)) {
            modefiedData[`presentAddress.${key}`] = value;
        }
    }
    // Check Permanent Address data
    if (permanentAddress && Object.keys(permanentAddress).length) {
        for (const [key, value] of Object.entries(permanentAddress)) {
            modefiedData[`permanentAddress.${key}`] = value;
        }
    }
    const result = yield faculty_model_1.Faculty.findByIdAndUpdate(id, modefiedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
/**
 * @Description  Delete Single Feaculty
 * @param '
 * @returns Data
 * @Method DELETE
 */
const deleteSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Init Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start Transaction
        session.startTransaction();
        const deletedFaculty = yield faculty_model_1.Faculty.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        // Validation
        if (!deletedFaculty) {
            throw new AppError_1.default(400, 'Faculty Deleted Failed!');
        }
        // User Id
        const userId = deletedFaculty.user;
        // Find and Delete User
        const deletedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        // Validation
        if (!deletedUser) {
            throw new AppError_1.default(400, 'User Deleted Failed!');
        }
        // Session Commit or Data Save
        yield session.commitTransaction();
        // End Session
        yield session.endSession();
        return deletedFaculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Failed to Delete Faculty Data');
    }
});
exports.FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyFromDB,
    deleteSingleFacultyFromDB,
};
