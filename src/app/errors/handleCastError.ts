import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorResources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorResources,
  };
};

export default handleCastError;
