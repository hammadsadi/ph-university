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
exports.SemesterRegistrationServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admission_semester_model_1 = require("../admissionSemester/admission.semester.model");
const semester_register_constant_1 = require("./semester.register.constant");
const semester_registration_model_1 = require("./semester.registration.model");
/**
 * @Description  Create Semester Registration Logic
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const semesterRegistrationDataSaveToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check If there any Registred Semester That is Already 'UPCOMING' or "ONGONING"
    const semesterRegistrationStatusScheck = yield semester_registration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semester_register_constant_1.RegistrationStatusTypes.UPCOMING },
            { status: semester_register_constant_1.RegistrationStatusTypes.ONGOING },
        ],
    });
    if (semesterRegistrationStatusScheck) {
        throw new AppError_1.default(400, `There is Already an ${semesterRegistrationStatusScheck.status} Registred Semester!`);
    }
    // Check academicSemester Exist or Not
    const academicSemester = payload.academicSemester;
    const academicSemesterExist = yield admission_semester_model_1.AdmissionSemester.findById(academicSemester);
    if (!academicSemesterExist) {
        throw new AppError_1.default(404, 'Admission Semester Not Found!');
    }
    // Check Semester Registration Already Exist or Not
    const semesterRegistrationExist = yield semester_registration_model_1.SemesterRegistration.findOne({
        academicSemester,
    });
    if (semesterRegistrationExist) {
        throw new AppError_1.default(404, 'Semester Registration Already Exist!');
    }
    // Create Semester Registration
    const result = yield semester_registration_model_1.SemesterRegistration.create(payload);
    return result;
});
/**
 * @Description  Get Semester Registration
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const semesterRegistrationDataGetFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semester_registration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
/**
 * @Description  Get Single Semester Registration
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const singleSemesterRegistrationDataGetFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_registration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return result;
});
/**
 * @Description  Update Single Semester Registration
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */
const singleSemesterRegistrationDataUpdateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkSemesterRegistration = yield semester_registration_model_1.SemesterRegistration.findById(id);
    // Check Data Exist or Not
    if (!checkSemesterRegistration) {
        throw new AppError_1.default(400, 'This Semester is Not Found!');
    }
    // Check Semester Register Status
    if (checkSemesterRegistration.status === semester_register_constant_1.RegistrationStatusTypes.ENDED) {
        throw new AppError_1.default(400, `This Semester is Already ${checkSemesterRegistration.status}`);
    }
    // Check Semester Register Status
    if (checkSemesterRegistration.status === semester_register_constant_1.RegistrationStatusTypes.UPCOMING &&
        payload.status === semester_register_constant_1.RegistrationStatusTypes.ENDED) {
        throw new AppError_1.default(400, `You Can not Directly Change Status From ${checkSemesterRegistration.status} to ${payload.status}`);
    }
    // Check Semester Register Status
    if (checkSemesterRegistration.status === semester_register_constant_1.RegistrationStatusTypes.ONGOING &&
        payload.status === semester_register_constant_1.RegistrationStatusTypes.UPCOMING) {
        throw new AppError_1.default(400, `You Can not Directly Change Status From ${checkSemesterRegistration.status} to ${payload.status}`);
    }
    const result = yield semester_registration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.SemesterRegistrationServices = {
    semesterRegistrationDataSaveToDB,
    semesterRegistrationDataGetFromDB,
    singleSemesterRegistrationDataGetFromDB,
    singleSemesterRegistrationDataUpdateFromDB,
};
