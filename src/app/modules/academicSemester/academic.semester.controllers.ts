import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academic.semester.services';

/**
 * Create Academic Semester Controller
 */
const academicSemesterCreate = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.academicSemesterSaveToDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Academic Semester Created Successful',
    data: result,
  });
});

/**
 * Get All Academic Semester Controller
 */
const academicSemesterGetAllController = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllCcademicSemesterToDB();
  sendResponse(res, {
    success: true,
    message: 'Academic Semester Get Successful',
    data: result,
  });
});

/**
 * Get Single Academic Semester Controller
 */
const academicSemesterGetSingleController = catchAsync(
  async (req, res, next) => {
    const result = await AcademicSemesterServices.getSingleCcademicSemesterToDB(
      req.params.semesterId,
    );
    sendResponse(res, {
      success: true,
      message: 'Single Academic Semester Get Successful',
      data: result,
    });
  },
);

/**
 * Update Single Academic Semester Controller
 */
const updateSingleAcademicSemesterControllers = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.updateSingleCcademicSemesterToDB(req.params.semesterId, req.body);
  sendResponse(res, {
    success: true,
    message: 'Single Academic Semester Updated Successful',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  academicSemesterCreate,
  academicSemesterGetAllController,
  academicSemesterGetSingleController,
  updateSingleAcademicSemesterControllers,
};
