import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.services';

/**
 * Create Academic Academic Department
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
 * Get All Academic Department
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
 * Get Single Academic Department
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
 * Update Single Academic Department
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
