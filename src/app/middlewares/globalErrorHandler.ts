/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: error.message || 'Something Went Wrong',
    error,
  });
};
export default globalErrorHandler;
