import { SemesterRegistrationServices } from './semester.registration.services';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * @Description  Create Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const createSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.semesterRegistrationDataSaveToDB(
      req.body,
    );
  sendResponse(res, {
    success: true,
    message: 'Semester Registration Created Successful',
    data: result,
  });
});

export const SemesterRegisterControllers = {
  createSemesterRegistration,
};
