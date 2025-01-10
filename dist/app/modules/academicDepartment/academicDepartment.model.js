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
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
}, {
    timestamps: true,
});
// // When Create Academic Department Check Exist or not Before Save Using Pre hooks
// academicDepartmentSchema.pre('save', async function (next) {
//   // Is Exist or not
//   const isExistDepartment = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isExistDepartment) {
//     throw new AppError(400, 'This Academic Department is Already Exist!');
//   }
//   next();
// });
// Check Data is Exist or Not When Update an Academic Department
academicDepartmentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        // Is Exist or not
        const isExistDepartment = yield exports.AcademicDepartment.findOne(query);
        if (!isExistDepartment) {
            throw new AppError_1.default(404, 'This Academic Department is Not Found!');
        }
        next();
    });
});
exports.AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
