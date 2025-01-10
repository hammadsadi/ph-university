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
exports.EnrolledCourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const offerCourse_model_1 = require("../offerCourse/offerCourse.model");
const student_mode_1 = require("../students/student.mode");
const enrolledCourse_model_1 = __importDefault(require("./enrolledCourse.model"));
const semester_registration_model_1 = require("../semesterRegistration/semester.registration.model");
const course_model_1 = require("../courses/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const enrolledCourse_utils_1 = require("./enrolledCourse.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
/**
 * @Description  Save Enrolled Course
 * @param '
 * @returns Response with data
 * @Method POST
 */
const saveEnrolledCourseToDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { offeredCourse } = payload;
    // Check Offer Course
    const isOfferedCourseExist = yield offerCourse_model_1.OfferCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'Offer Course Not Found');
    }
    // Capacity Validation
    if ((isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.maxCapacity) <= 0) {
        throw new AppError_1.default(400, 'Room is Full!');
    }
    // Get Student Info
    const student = yield student_mode_1.Student.findOne({ id: userId }, { _id: 1 });
    if (!student) {
        throw new AppError_1.default(404, 'Student Not Found');
    }
    // Check Student Already Enrolled Or Not
    const isStudentAlreadyEnrolled = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
        offeredCourse,
        student: student === null || student === void 0 ? void 0 : student._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new AppError_1.default(400, 'Student is Already Enrolled!');
    }
    // Get Course Info
    const course = yield course_model_1.Course.findById(isOfferedCourseExist.course);
    // Get Total Credits
    const semesterRegistration = yield semester_registration_model_1.SemesterRegistration.findById(isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration);
    const enrolledCourses = yield enrolledCourse_model_1.default.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
                student: student._id,
            },
        },
        // Stage For Another Data Collection Lockup
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'enrolledCourseData',
            },
        },
        // Unwind For Enrolled Course Data
        {
            $unwind: '$enrolledCourseData',
        },
        // Group Stage
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
            },
        },
        // Project Stage
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1,
            },
        },
    ]);
    // Check Total Credits Exceeds MaxCredit
    const totalCredits = (enrolledCourses === null || enrolledCourses === void 0 ? void 0 : enrolledCourses.length) > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
    if (totalCredits &&
        (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCradit) &&
        totalCredits + (course === null || course === void 0 ? void 0 : course.credits) > (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCradit)) {
        throw new AppError_1.default(400, 'You have Exceeded Maximum Number of Credits!');
    }
    // Transaction and Roleback
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield enrolledCourse_model_1.default.create([
            {
                semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
                admissionSemester: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.admissionSemester,
                academicFaculty: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.academicFecaulty,
                academicDepartment: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.academicDepartment,
                offeredCourse: offeredCourse,
                course: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.course,
                student: student === null || student === void 0 ? void 0 : student._id,
                faculty: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.faculty,
                isEnrolled: true,
            },
        ], { session });
        const prevMaxCapacity = isOfferedCourseExist.maxCapacity;
        yield offerCourse_model_1.OfferCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: prevMaxCapacity - 1,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
/**
 * @Description  Update Enrolled Course Marks
 * @param '
 * @returns Response with data
 * @Method PATCH
 */
const updateEnrolledCourseMarksFromDB = (facultyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const modifiedData = Object.assign({}, courseMarks);
    // Check Offer Course
    const isOfferedCourseExist = yield offerCourse_model_1.OfferCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(404, 'Offer Course Not Found');
    }
    // Check Semester Registration
    const isSemesterRegistrationExist = yield semester_registration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(404, 'Semester Registration Not Found!');
    }
    // Check Student
    const isStudentExist = yield student_mode_1.Student.findById(student);
    if (!isStudentExist) {
        throw new AppError_1.default(404, 'Student Not Found!');
    }
    // Get Faculty
    const faculty = yield faculty_model_1.Faculty.findOne({ id: facultyId }, { _id: 1 });
    if (!faculty) {
        throw new AppError_1.default(404, 'Faculty Not Found!');
    }
    // Check Course Belong to Faculty
    const isCourseBelongToFaculty = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration,
        offeredCourse,
        faculty: faculty === null || faculty === void 0 ? void 0 : faculty._id,
    });
    if (!isCourseBelongToFaculty) {
        throw new AppError_1.default(403, 'You are Forbidden!');
    }
    // Calculate Grade
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } = isCourseBelongToFaculty.courseMarks;
        const totalMarks = Math.ceil(classTest1) +
            Math.ceil(midTerm) +
            Math.ceil(classTest2) +
            Math.ceil(finalTerm);
        const result = (0, enrolledCourse_utils_1.calculateGradeAndPoints)(totalMarks);
        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
    }
    // Dinamically Update
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    const result = yield enrolledCourse_model_1.default.findByIdAndUpdate(isCourseBelongToFaculty === null || isCourseBelongToFaculty === void 0 ? void 0 : isCourseBelongToFaculty._id, modifiedData, { new: true });
    return result;
});
/**
 * @Description  Get All Enrolled Course From DB
 * @param '
 * @returns Response with data
 * @Method GET
 */
const getAllEnrolledCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const enrolledcourseQuery = new QueryBuilder_1.default(enrolledCourse_model_1.default.find()
        .populate('semesterRegistration')
        .populate('admissionSemester')
        .populate('academicDepartment')
        .populate('offeredCourse')
        .populate('course')
        .populate('student')
        .populate('faculty')
        .populate('academicFaculty'), query)
        .filter()
        .pagination()
        .sort()
        .fields();
    const result = yield enrolledcourseQuery.modelQuery;
    return result;
});
exports.EnrolledCourseServices = {
    saveEnrolledCourseToDB,
    updateEnrolledCourseMarksFromDB,
    getAllEnrolledCourseFromDB,
};
