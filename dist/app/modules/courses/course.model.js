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
exports.CourseFaculty = exports.Course = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Pre Requisite Course Schema
const preRequisiteSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
        trim: true,
    },
    preRequisiteCourses: [preRequisiteSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// When Create Course Check Exist or not Before Save Using Pre hooks
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Is Exist or not
        const isExistCourse = yield exports.Course.findOne({
            title: this.title,
        });
        if (isExistCourse) {
            throw new AppError_1.default(400, 'This Course is Already Exist!');
        }
        next();
    });
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
const courseFacultiesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    faculties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});
exports.CourseFaculty = (0, mongoose_1.model)('CourseFaculty', courseFacultiesSchema);
