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
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_contant_1 = require("./admin.contant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Name Sub Schema
const adminNameSubSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        required: true,
    },
});
// Present Address Sub Schema
const presentAddressSubschema = new mongoose_1.Schema({
    street_address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
});
// Main Schema
const adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    name: {
        type: adminNameSubSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: admin_contant_1.Gender,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
        enum: admin_contant_1.BloodGroup,
        required: true,
    },
    presentAddress: {
        type: presentAddressSubschema,
        required: true,
    },
    permanentAddress: {
        type: presentAddressSubschema,
        required: true,
    },
    profileImg: {
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
// When Create Admin Check Exist or not Before Save Using Pre hooks
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Is Exist or not
        const isExistAdmin = yield exports.Admin.findOne({
            email: this.email,
        });
        if (isExistAdmin) {
            throw new AppError_1.default(400, 'This Admin is Already Exist!');
        }
        next();
    });
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
