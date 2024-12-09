/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.services';

/**
 * @Description  Create Academic Academic Department
 * @param ''
 * @returns Response with data
 * @Method POST
 */
const academicDepartmentCreate = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.academicDepartmentSaveToDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Academic Department Created Successful',
    data: result,
  });
});

/**
 * @Description  Get All Academic Department
 * @param ''
 * @returns Response with data
 * @Method GET
 */
const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    success: true,
    message: 'Academic Department Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Academic Department
 * @param departmentId
 * @returns Response with data
 * @Method GET
 */
const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.departmentId,
    );
  sendResponse(res, {
    success: true,
    message: 'Single Academic Department Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Academic Department
 * @param departmentId
 * @returns Response with data
 * @Method PATCH
 */
const updateSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDB(
      req.params.departmentId,
      req.body,
    );
  sendResponse(res, {
    success: true,
    message: 'Single Academic Department Updated Successful',
    data: result,
  });
});
export const AcademicDepartmentControllers = {
  academicDepartmentCreate,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
