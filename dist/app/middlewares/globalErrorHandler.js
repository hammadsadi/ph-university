"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const zodErrorHandler_1 = __importDefault(require("../errors/zodErrorHandler"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (error, req, res, 
// eslint-disable-next-line no-unused-vars
next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    // Error
    let errorResources = [
        {
            path: '',
            message: 'Something Went Wrong',
        },
    ];
    // Detect Zod Error
    if (error instanceof zod_1.ZodError) {
        const errorSimplies = (0, zodErrorHandler_1.default)(error);
        statusCode = errorSimplies.statusCode;
        message = errorSimplies.message;
        errorResources = errorSimplies.errorResources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        // If Zod Validation Error not Workin then it be worked
        const errorSimplies = (0, handleValidationError_1.default)(error);
        statusCode = errorSimplies.statusCode;
        message = errorSimplies.message;
        errorResources = errorSimplies.errorResources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        // Handle CastError
        const errorSimplies = (0, handleCastError_1.default)(error);
        statusCode = errorSimplies.statusCode;
        message = errorSimplies.message;
        errorResources = errorSimplies.errorResources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        // Handle CastError
        const errorSimplies = (0, handleDuplicateError_1.default)(error);
        statusCode = errorSimplies.statusCode;
        message = errorSimplies.message;
        errorResources = errorSimplies.errorResources;
    }
    else if (error instanceof AppError_1.default) {
        // Handle Throw New Error
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorResources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        // Handle Error
        message = error.message;
        errorResources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorResources,
        stack: config_1.default.node_env === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
