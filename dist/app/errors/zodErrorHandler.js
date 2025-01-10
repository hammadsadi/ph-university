"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Zod Error Handler
const zodErrorHandler = (error) => {
    const errorResources = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorResources,
    };
};
exports.default = zodErrorHandler;
