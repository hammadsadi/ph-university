"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extactMessage = match && match[1];
    const errorResources = [
        {
            path: '',
            message: `${extactMessage} Already Exist!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorResources,
    };
};
exports.default = handleDuplicateError;
