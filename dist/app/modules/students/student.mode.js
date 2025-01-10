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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Student Name Sub Schema
const studentNameSchema = new mongoose_1.Schema({
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
const presentAddressSchema = new mongoose_1.Schema({
    street_address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
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
// Guardian Sub Schema
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContact: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContact: {
        type: String,
        required: true,
    },
});
// Local Guardina Sub Schema
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
});
// Student Main Schema
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: studentNameSchema,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AdmissionSemester',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
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
    presentAddress: {
        type: presentAddressSchema,
        required: true,
    },
    permanentAddress: {
        type: presentAddressSchema,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    profileImage: {
        type: String,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Check Data is Exist or Not When Student Update
studentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        // Is Exist or not
        const isExistStudent = yield exports.Student.findOne(query);
        if (!isExistStudent) {
            console.log(isExistStudent);
            throw new AppError_1.default(404, 'This Student Data is Not Found!');
        }
        next();
    });
});
// When Create Student Check Exist or not Before Save Using Pre hooks
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Is Exist or not
        const isExistStudent = yield exports.Student.findOne({
            email: this.email,
        });
        if (isExistStudent) {
            throw new AppError_1.default(400, 'This Student is Already Exist!');
        }
        next();
    });
});
// Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
