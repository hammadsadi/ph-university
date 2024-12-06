import { ZodError, ZodIssue } from 'zod';
import { TErrorResources, TGenericErrorResponse } from '../interfaces/error';

// Zod Error Handler
const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
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

export default zodErrorHandler;
