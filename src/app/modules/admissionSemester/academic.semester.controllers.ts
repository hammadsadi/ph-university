/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdmissioncSemesterServices } from './admission.semester.services';

/**
 * Create Admission Semester Controller
 */
const admissionSemesterCreate = catchAsync(async (req, res, next) => {
  const result = await AdmissioncSemesterServices.admissionSemesterSaveToDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Admission Semester Created Successful',
    data: result,
  });
});

/**
 * Get All Admission Semester Controller
 */
const admissionSemesterGetAllController = catchAsync(async (req, res, next) => {
  const result = await AdmissioncSemesterServices.getAllAdmissionSemesterToDB();
  sendResponse(res, {
    success: true,
    message: 'Admission Semester Get Successful',
    data: result,
  });
});

/**
 * Get Single Admission Semester Controller
 */
const admissionSemesterGetSingleController = catchAsync(
  async (req, res, next) => {
    const result =
      await AdmissioncSemesterServices.getSingleAdmissionSemesterToDB(
        req.params.semesterId,
      );
    sendResponse(res, {
      success: true,
      message: 'Single Admission Semester Get Successful',
      data: result,
    });
  },
);

/**
 * Update Single Admission Semester Controller
 */
const updateSingleAdmissionSemesterControllers = catchAsync(
  async (req, res, next) => {
    const result =
      await AdmissioncSemesterServices.updateSingleAdmissionSemesterToDB(
        req.params.semesterId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      message: 'Single Admission Semester Updated Successful',
      data: result,
    });
  },
);
export const AdmissionSemesterControllers = {
  admissionSemesterCreate,
  admissionSemesterGetAllController,
  admissionSemesterGetSingleController,
  updateSingleAdmissionSemesterControllers,
};
