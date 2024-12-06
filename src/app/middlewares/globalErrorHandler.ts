/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResources } from '../interfaces/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something Went Wrong';

  // Error
  let errorResources: TErrorResources = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  // Zod Error Handler
  const zodErrorHandler = (error: ZodError) => {
    const errorResources: TErrorResources = error.issues.map(
      (issue: ZodIssue) => {
        return {
          path: issue?.path[issue.path.length - 1],
          message: issue.message,
        };
      },
    );
    const statusCode = 400;

    return {
      statusCode,
      message: 'Validation Error',
      errorResources,
    };
  };

  // detect Zod Error
  if (error instanceof ZodError) {
    const errorSimplies = zodErrorHandler(error);
    statusCode = errorSimplies.statusCode;
    message = errorSimplies.message;
    errorResources = errorSimplies.errorResources;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorResources,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};
export default globalErrorHandler;
