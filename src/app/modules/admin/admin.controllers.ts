/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.services';

/**
 * @Description  Get All Admin
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getAllAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getAllAdminFromDB();
  sendResponse(res, {
    success: true,
    message: 'Admin Get Successful',
    data: result,
  });
});

/**
 * @Description  Get Single Admin
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const getSingleAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getSingleAdminFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Admin Get Successful',
    data: result,
  });
});

/**
 * @Description  Update Single Admin
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */

const updateSingleAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminServices.updateSingleAdminFromDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Single Admin Updated Successful',
    data: result,
  });
});

/**
 * @Description  Delete Single Admin
 * @param ''
 * @returns Response with data
 * @Method DELETE
 */

const deleteSingleAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminServices.deleteSingleAdminFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'Admin Deleted Successful',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
