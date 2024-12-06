import { TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
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

export default handleDuplicateError;
