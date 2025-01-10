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
exports.OfferCourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academic_faculty_model_1 = require("../academicFaculty/academic.faculty.model");
const course_model_1 = require("../courses/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const semester_registration_model_1 = require("../semesterRegistration/semester.registration.model");
const offerCourse_model_1 = require("./offerCourse.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
const student_mode_1 = require("../students/student.mode");
/**
 *@Description Create Offer Course
 @Method POST
 */
const offerCourseSaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFecaulty, academicDepartment, course, section, faculty, days, startTime, endTime, } = payload;
    // Check Semester Registration
    const isSemesterRegistrationExist = yield semester_registration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(404, 'Semester Registration Not Found!');
    }
    const admissionSemester = isSemesterRegistrationExist.academicSemester;
    // Check Academic Fecaulty
    const isAcademicFecaultyExist = yield academic_faculty_model_1.AcademicFaculty.findById(academicFecaulty);
    if (!isAcademicFecaultyExist) {
        throw new AppError_1.default(404, 'Academic Faculty Not Found!');
    }
    // Check Academic Department
    const isAcademicDepartmentExist = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(404, 'Academic Department Not Found!');
    }
    // Check Course
    const isCourseExist = yield course_model_1.Course.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(404, 'Course Not Found!');
    }
    // Check Faculty
    const isFacultyExist = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(404, 'Faculty Not Found!');
    }
    // Check if the Department is Belong to The Faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        academicFaculty: academicFecaulty,
        _id: academicDepartment,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(404, `This  ${isAcademicDepartmentExist.name} is not belong to this ${isAcademicFecaultyExist.name}`);
    }
    // Check Requested Offer Course Section Exist
    const isOfferCourseSectionExist = yield offerCourse_model_1.OfferCourse.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isOfferCourseSectionExist) {
        throw new AppError_1.default(400, `Offered Course With Section Already Exist!`);
    }
    // Get All Offered Course For Validation
    const assignedSchedule = yield offerCourse_model_1.OfferCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSchedule = {
        startTime,
        endTime,
        days,
    };
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedule, newSchedule)) {
        throw new AppError_1.default(400, `This Feaculty Is Not Avilable at that time! Chose other time or day!`);
    }
    const result = yield offerCourse_model_1.OfferCourse.create(Object.assign(Object.assign({}, payload), { admissionSemester }));
    return result;
});
/**
 *@Description Updated Offer Course
 @Method PATCH
 */
const updatedOfferCourseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, startTime, endTime, days } = payload;
    // Check Offered Course
    const isExistOfferedCourse = yield offerCourse_model_1.OfferCourse.findById(id);
    if (!isExistOfferedCourse) {
        throw new AppError_1.default(404, `This Offered Course Not Found!`);
    }
    // Check Feaculty
    const isExistFaculty = yield faculty_model_1.Faculty.findById(faculty);
    if (!isExistFaculty) {
        throw new AppError_1.default(404, `This Faculty Not Found!`);
    }
    const semesterRegistration = isExistOfferedCourse.semesterRegistration;
    const checkSemesterRegistrationStatus = yield semester_registration_model_1.SemesterRegistration.findById(semesterRegistration);
    if ((checkSemesterRegistrationStatus === null || checkSemesterRegistrationStatus === void 0 ? void 0 : checkSemesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(400, `You Cannot Update This Offered Course Because it is ${checkSemesterRegistrationStatus === null || checkSemesterRegistrationStatus === void 0 ? void 0 : checkSemesterRegistrationStatus.status}`);
    }
    // Get All Offered Course For Validation
    const assignedSchedule = yield offerCourse_model_1.OfferCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSchedule = {
        startTime,
        endTime,
        days,
    };
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedule, newSchedule)) {
        throw new AppError_1.default(400, `This Feaculty Is Not Avilable at that time! Chose other time or day!`);
    }
    // Now Update Offered Course
    const result = yield offerCourse_model_1.OfferCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
});
/**
 *@Description Get All Offer Course
 @Method GET
 */
const getAllOfferCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // GET ALL Offered Course
    const result = yield offerCourse_model_1.OfferCourse.find()
        .populate('semesterRegistration')
        .populate('admissionSemester')
        .populate('academicFecaulty')
        .populate('academicDepartment')
        .populate('course')
        .populate('faculty');
    return result;
});
/**
 *@Description Get Single Offer Course
 @Method GET
 */
const getSingleOfferCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // GET Single Offered Course
    const result = yield offerCourse_model_1.OfferCourse.findById(id)
        .populate('semesterRegistration')
        .populate('admissionSemester')
        .populate('academicFecaulty')
        .populate('academicDepartment')
        .populate('course')
        .populate('faculty');
    return result;
});
/**
 *@Description Delete Single Offer Course
 @Method DELETE
 */
const deleteSingleOfferCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Start Session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start Transaction
        session.startTransaction();
        // Check Offered Course Exist
        const checkOfferedCourseExist = yield offerCourse_model_1.OfferCourse.findById(id);
        if (!checkOfferedCourseExist) {
            throw new AppError_1.default(404, `This Offered Course Not Found!`);
        }
        // Get Semester Registration ID
        const semesterRegistration = checkOfferedCourseExist.semesterRegistration;
        // Check Semester Registration Status
        const checkSemesterRegistrationStatus = yield semester_registration_model_1.SemesterRegistration.findById({
            _id: semesterRegistration,
        });
        if ((checkSemesterRegistrationStatus === null || checkSemesterRegistrationStatus === void 0 ? void 0 : checkSemesterRegistrationStatus.status) !== 'UPCOMING') {
            throw new AppError_1.default(400, `Offered course can not update ! because the semester ${checkSemesterRegistrationStatus === null || checkSemesterRegistrationStatus === void 0 ? void 0 : checkSemesterRegistrationStatus.status}`);
        }
        // Delete All The Associated Pffered Course
        const deletedOfferedCourses = yield offerCourse_model_1.OfferCourse.deleteMany({
            semesterRegistration,
        }, { session });
        // Check Offered Course Deleted or Not
        if (!deletedOfferedCourses) {
            throw new AppError_1.default(400, `Offered course Deleted Failed!`);
        }
        // Deleted Semester Registration
        const deletedSemisterRegistration = yield semester_registration_model_1.SemesterRegistration.findByIdAndDelete({
            _id: semesterRegistration,
        }, { session });
        // Check Semester Registration Deleted or Not
        if (!deletedSemisterRegistration) {
            throw new AppError_1.default(400, `Semester Registration Deleted Failed!`);
        }
        // Commit
        yield session.commitTransaction();
        // End Session
        yield session.endSession();
        return deletedOfferedCourses;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Offered Course Deleted Failed!');
    }
});
/**
 *@Description My Offer Course
 @Method GET
 */
const myOfferCourseFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find Student
    const isExistStudent = yield student_mode_1.Student.findOne({ id: userId });
    if (!isExistStudent) {
        throw new AppError_1.default(404, 'Student Not Found!');
    }
    // Find Current ONGOING Semester
    const currentOnGoingRegistrationSemester = yield semester_registration_model_1.SemesterRegistration.findOne({
        status: 'ONGOING',
    });
    if (!currentOnGoingRegistrationSemester) {
        throw new AppError_1.default(404, 'There is no Ongoing Semester Registration!');
    }
    // Find Match Offer Course
    const result = yield offerCourse_model_1.OfferCourse.aggregate([
        {
            $match: {
                semesterRegistration: currentOnGoingRegistrationSemester._id,
                academicFecaulty: isExistStudent.academicFaculty,
                academicDepartment: isExistStudent.academicDepartment,
            },
        },
        // Lookup Stage
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course',
            },
        },
        // Unwind For Course Array
        {
            $unwind: '$course',
        },
        // Lookup For Get Enrolled Courses
        {
            $lookup: {
                from: 'enrolledcourses',
                let: {
                    currentOnGoingRegistrationSemester: currentOnGoingRegistrationSemester._id,
                    currentStudent: isExistStudent._id,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            '$semesterRegistration',
                                            '$$currentOnGoingRegistrationSemester',
                                        ],
                                    },
                                    {
                                        $eq: ['$student', '$$currentStudent'],
                                    },
                                    {
                                        $eq: ['$isEnrolled', true],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: 'enrolledCourses',
            },
        },
        // Lookup Stage For Completed Course
        {
            $lookup: {
                from: 'enrolledcourses',
                let: {
                    currentStudent: isExistStudent._id,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ['$student', '$$currentStudent'],
                                    },
                                    {
                                        $eq: ['$isCompleted', true],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: 'completedCourse',
            },
        },
        // Stage For Completed Course Id
        {
            $addFields: {
                completedCourseIds: {
                    $map: {
                        input: '$completedCourse',
                        as: 'completed',
                        in: '$$completed.course',
                    },
                },
            },
        },
        // Stage For Add Fields
        {
            $addFields: {
                isPreRequisitesFulFilled: {
                    $or: [
                        { $eq: ['$course.preRequisiteCourses', []] },
                        {
                            $setIsSubset: [
                                '$course.preRequisiteCourses.course',
                                '$completedCourseIds',
                            ],
                        },
                    ],
                },
                isAlreadyEnrolled: {
                    $in: [
                        '$course._id',
                        {
                            $map: {
                                input: '$enrolledCourses',
                                as: 'enroll',
                                in: '$$enroll.course',
                            },
                        },
                    ],
                },
            },
        },
        // Match Stage
        {
            $match: {
                isAlreadyEnrolled: false,
                isPreRequisitesFulFilled: true,
            },
        },
    ]);
    return result;
});
exports.OfferCourseServices = {
    offerCourseSaveToDB,
    updatedOfferCourseFromDB,
    getAllOfferCourseFromDB,
    getSingleOfferCourseFromDB,
    deleteSingleOfferCourseFromDB,
    myOfferCourseFromDB,
};
