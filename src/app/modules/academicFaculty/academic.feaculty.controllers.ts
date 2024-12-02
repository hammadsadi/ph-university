import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academic.faculty.services';

/**
 * Create Academic Feaculty Controller
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
 * Get All Academic Feaculty Controller
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
 * Get Single Academic Feaculty Controller
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
 * Update Single Academic Feaculty Controller
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
