import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.services';

/**
 * @Description  Get All Faculty
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getAllFacultyFromDB();
  sendResponse(res, {
    success: true,
    message: 'Faculty Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Faculty
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getSingleFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getSingleFacultyFromDB(
    req.params.facultyId,
  );
  sendResponse(res, {
    success: true,
    message: 'Faculty Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Faculty
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */

const updateSingleFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.updateSingleFacultyFromDB(
    req.params.facultyId,
    req.body
  );
  sendResponse(res, {
    success: true,
    message: 'Faculty Updated Successful',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
};
