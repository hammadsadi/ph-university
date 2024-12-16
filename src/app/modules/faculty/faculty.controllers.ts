/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
  const result = await FacultyServices.getAllFacultyFromDB(req.query);
  console.log(req.cookies);
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
  const result = await FacultyServices.getSingleFacultyFromDB(req.params.id);
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
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Faculty Updated Successful',
    data: result,
  });
});

/**
 * @Description  Delete Single Faculty
 * @param ''
 * @returns Response with data
 * @Method DELETE
 */

const deleteSingleFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteSingleFacultyFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Faculty Deleted Successful',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
