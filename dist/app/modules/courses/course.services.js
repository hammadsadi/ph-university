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
exports.CourseServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
/**
 *@Description Create Course
 @Method POST
 */
const courseSaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
/**
 *@Description Assign Faculties With Course
 @Method PUT
 */
const assignFacultiesWithCoursesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
/**
 *@Description Remove Faculties From Course
 @Method DELETE
 */
const removeFacultiesFromCoursesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, {
        new: true,
    });
    return result;
});
/**
 *@Description Get All Course
 @Method GET
 */
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.CourseSearchableFields)
        .filter()
        .pagination()
        .sort()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
/**
 *@Description Get Single Course
 @Method GET
 */
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return result;
});
/**
 *@Description Get Faculties With Course
 @Method GET
 */
const getFacultiesWithCourseFromDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findOne({ course: courseId }).populate('faculties');
    return result;
});
/**
 *@Description Update Course
 @Method Patch
 */
const updateSingleCourseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Init Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start Transaction
        session.startTransaction();
        const { preRequisiteCourses } = payload, remainingCouresInfo = __rest(payload, ["preRequisiteCourses"]);
        const updatedBasicCourse = yield course_model_1.Course.findByIdAndUpdate(id, remainingCouresInfo, {
            new: true,
            runValidators: true,
            session,
        });
        // Check
        if (!updatedBasicCourse) {
            throw new AppError_1.default(400, 'Basic Course Info Updated Failed!');
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // Check Pre Requisite Exist or Not
            // Filter out the Deleted Field
            const deletedRequisite = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const deletedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedRequisite } } },
            }, { new: true, runValidators: true, session });
            // Check
            if (!deletedPreRequisiteCourses) {
                throw new AppError_1.default(400, 'Pre Requisite Course Deleted Failed!');
            }
            // Filter out New Pre Requisite Courses
            const newPreRequisite = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
            const addNewPreRequisiteCourse = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            // Check
            if (!addNewPreRequisiteCourse) {
                throw new AppError_1.default(400, 'Pre Requisite Course Updated Failed!');
            }
        }
        // Get Again Data
        const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Course Updated Failed!');
    }
});
/**
 *@Description Delete Single Course
 @Method DELETE
 */
const deleteSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true });
    return result;
});
exports.CourseServices = {
    courseSaveToDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteSingleCourseFromDB,
    updateSingleCourseFromDB,
    assignFacultiesWithCoursesIntoDB,
    removeFacultiesFromCoursesIntoDB,
    getFacultiesWithCourseFromDB,
};
