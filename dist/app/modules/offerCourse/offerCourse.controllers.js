"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
exports.OfferCourseCOntrollers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const offerCourse_services_1 = require("./offerCourse.services");
/**
 * @Description  Create Offer Course
 * @param '
 * @returns Response with data
 * @Method POST
 */
const createOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerCourse_services_1.OfferCourseServices.offerCourseSaveToDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Offer Course Created Successful',
        data: result,
    });
}));
/**
 * @Description  Get Offer Course
 * @param ID
 * @returns Response with data
 * @Method GET
 */
const getOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerCourse_services_1.OfferCourseServices.getAllOfferCourseFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Offer Course Get Successful',
        data: result,
    });
}));
/**
 * @Description  Get Single Offer Course
 * @param ID
 * @returns Response with data
 * @Method GET
 */
const getSingleOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerCourse_services_1.OfferCourseServices.getSingleOfferCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Single Offer Course Get Successful',
        data: result,
    });
}));
/**
 * @Description  Updated Offer Course
 * @param ID
 * @returns Response with data
 * @Method PATCH
 */
const updatedOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerCourse_services_1.OfferCourseServices.updatedOfferCourseFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Offer Course Updated Successful',
        data: result,
    });
}));
/**
 * @Description  Delete Offer Course
 * @param ID
 * @returns Response with data
 * @Method DELETE
 */
const deleteOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerCourse_services_1.OfferCourseServices.deleteSingleOfferCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Offer Course Deleted Successful',
        data: result,
    });
}));
/**
 * @Description  My Offer Course
 * @param ""
 * @returns Response with data
 * @Method GET
 */
const myOfferCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield offerCourse_services_1.OfferCourseServices.myOfferCourseFromDB(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'My Offer Courses Get Successful',
        data: result,
    });
}));
exports.OfferCourseCOntrollers = {
    createOfferCourse,
    updatedOfferCourse,
    getOfferCourse,
    getSingleOfferCourse,
    deleteOfferCourse,
    myOfferCourse,
};
