/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academic.faculty.services';

/**
 * @Description  Create Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const academicFeacultyCreate = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.academicFacultySaveToDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Academic Feaculty Created Successful',
    data: result,
  });
});

/**
 * @Description  Get All Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllAcademicFeaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFeacultyFromDB();
  sendResponse(res, {
    success: true,
    message: 'Academic Feaculty Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Academic Feaculty Controller
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getSingleAcademicFeaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getSingleAcademicFeacultyFromDB(
    req.params.feacultyId,
  );
  sendResponse(res, {
    success: true,
    message: 'Single Academic Feaculty Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Academic Feaculty Controller
 * @param feacultyId
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleAcademicFeacultyControllers = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicFacultyServices.updateSingleAcademicFeacultyFromDB(
        req.params.feacultyId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      message: 'Single Academic Feaculty Updated Successful',
      data: result,
    });
  },
);
export const AcademicFeacultyControllers = {
  academicFeacultyCreate,
  getAllAcademicFeaculty,
  getSingleAcademicFeaculty,
  updateSingleAcademicFeacultyControllers,
};
