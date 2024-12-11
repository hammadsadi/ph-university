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


/**
 * @Description  GET All Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.semesterRegistrationDataGetFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Semester Registration Get Successful',
    data: result,
  });
});


/**
 * @Description  GET Single Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getSingleSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.singleSemesterRegistrationDataGetFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Single Semester Registration Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Semester Registeration
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */

const updateSingleSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.singleSemesterRegistrationDataGetFromDB(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    message: 'Single Semester Registration Updated Successful',
    data: result,
  });
});

export const SemesterRegisterControllers = {
  createSemesterRegistration,
  getSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
};
