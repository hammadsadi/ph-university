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
exports.StudentServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const student_mode_1 = require("./student.mode");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../users/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constant_1 = require("./student.constant");
// Get All Student
const getAllStudentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Query Object Copy
    // const queryObj = { ...query };
    // let searchTerm = '';
    // Check Query
    // if (query.searchTerm) {
    //   searchTerm = query.searchTerm as string;
    // }
    // Searching Student
    // const searchStudent = Student.find({
    //   $or: [
    //     'email',
    //     'name.firstName',
    //     'name.lastName',
    //     'presentAddress.city',
    //     'permanentAddress.city',
    //   ].map((field) => ({
    //     [field]: { $regex: searchTerm, $options: 'i' },
    //   })),
    // });
    // Get All Student and Filter
    // const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludeField.forEach((el) => delete queryObj[el]);
    // const filterQuery = searchStudent
    //   .find(queryObj)
    //   .populate('admissionSemester')
    //   .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //       path: 'academicFaculty',
    //     },
    //   });
    // Sorting
    // let sort = '-createdAt';
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // Limit
    // let page = 1;
    // let limit = 2;
    // let skip = 0;
    // if (query.limit) {
    //   limit = Number(query.limit);
    // }
    // Check Page and Limit
    // if (query.page) {
    //   page = Number(query.page);
    //   skip = (page - 1) * limit;
    // }
    // Paginate
    // const paginateQuery = sortQuery.skip(skip);
    // // Lmit
    // const limitQuery = paginateQuery.limit(limit);
    // Field Query
    // let fields = '__v';
    // if (query.fields) {
    //   fields = (query.fields as string).split(',').join(' ');
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(student_mode_1.Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    }), query)
        .search(student_constant_1.searchAbleFields)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield studentQuery.modelQuery;
    const metaInfo = studentQuery.countTotal();
    return result;
});
// Get Single Student
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get Single Academic Feaculty
    const result = yield student_mode_1.Student.findById(id)
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
});
/**
 * @Description  Updated Single Student
 * @param id
 * @returns Data
 * @Method Patch
 */
const updateSingleStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, presentAddress, permanentAddress, guardian, localGuardian } = payload, remaingPayload = __rest(payload, ["name", "presentAddress", "permanentAddress", "guardian", "localGuardian"]);
    // Empty Object For Store Data
    const modefiedData = Object.assign({}, remaingPayload);
    // Set Data for name none Primitive Data Using For loop
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modefiedData[`name.${key}`] = value;
        }
    }
    // Set Data for Present Address none Primitive Data Using For loop
    if (presentAddress && Object.keys(presentAddress).length) {
        for (const [key, value] of Object.entries(presentAddress)) {
            modefiedData[`presentAddress.${key}`] = value;
        }
    }
    // Set Data for Permanent Address none Primitive Data Using For loop
    if (permanentAddress && Object.keys(permanentAddress).length) {
        for (const [key, value] of Object.entries(permanentAddress)) {
            modefiedData[`permanentAddress.${key}`] = value;
        }
    }
    // Set Data for Guardina none Primitive Data Using For loop
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modefiedData[`guardian.${key}`] = value;
        }
    }
    // Set Data for Local Guardian none Primitive Data Using For loop
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modefiedData[`localGuardian.${key}`] = value;
        }
    }
    // Find and Update Student Data
    const result = yield student_mode_1.Student.findByIdAndUpdate(id, modefiedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
/**
 * @Description Delete Single Student
 * @param id
 * @returns Data
 * @Method DELETE
 */
const deleteSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Init Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Session Start
        session.startTransaction();
        // Find and Delete Student
        const deletedStudent = yield student_mode_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        // Validation
        if (!deletedStudent) {
            throw new AppError_1.default(400, 'Student Deleted Failed!');
        }
        const userId = deletedStudent.user;
        // Find and Delete User
        const deletedUser = yield user_model_1.User.findOneAndUpdate(userId, { isDeleted: true }, { new: true, session });
        // Validation
        if (!deletedUser) {
            throw new AppError_1.default(400, 'User Deleted Failed!');
        }
        // Session Commit or Data Save
        yield session.commitTransaction();
        // End Session
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Failed to Delete Student Data');
    }
});
exports.StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    updateSingleStudentFromDB,
    deleteSingleStudentFromDB,
};
