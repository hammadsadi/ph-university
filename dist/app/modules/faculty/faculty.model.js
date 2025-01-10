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
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Faculty Sub Name Schema
const facultyNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
});
// Present Address Sub Schema
const presentAddressSubSchema = new mongoose_1.Schema({
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street_address: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});
// Faculty Main Schema
const facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: facultyNameSchema,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: faculty_constant_1.Gender,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: faculty_constant_1.BloodGroup,
        required: true,
    },
    presentAddress: {
        type: presentAddressSubSchema,
        required: true,
    },
    permanentAddress: {
        type: presentAddressSubSchema,
        required: true,
    },
    profileImage: {
        type: String,
        default: null,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// When Create Academic Department Check Exist or not Before Save Using Pre hooks
facultySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Is Exist or not
        const isExistFaculty = yield exports.Faculty.findOne({
            email: this.email,
        });
        if (isExistFaculty) {
            throw new AppError_1.default(400, 'This Faculty is Already Exist!');
        }
        next();
    });
});
exports.Faculty = (0, mongoose_1.model)('Faculty', facultySchema);
