import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';

/**
 * @Description  Get All Admin
 * @param ''
 * @returns Data
 * @Method GET
 */
const getAllAdminFromDB = async () => {
  const result = await Admin.find().populate('user');
  return result;
};

/**
 * @Description  Get Single Admin
 * @param ''
 * @returns Data
 * @Method GET
 */
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate('user');

  return result;
};

/**
 * @Description  Update Single Admin
 * @param '
 * @returns Data
 * @Method PATCH
 */
const updateSingleAdminFromDB = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, presentAddress, permanentAddress, ...remainingPayload } =
    payload;

  // Modefied Data
  const modefiedData: Record<string, unknown> = { ...remainingPayload };

  // Check Name data
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modefiedData[`name.${key}`] = value;
    }
  }
  // Check Present Address data
  if (presentAddress && Object.keys(presentAddress).length) {
    for (const [key, value] of Object.entries(presentAddress)) {
      modefiedData[`presentAddress.${key}`] = value;
    }
  }
  // Check Permanent Address data
  if (permanentAddress && Object.keys(permanentAddress).length) {
    for (const [key, value] of Object.entries(permanentAddress)) {
      modefiedData[`permanentAddress.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modefiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

/**
 * @Description  Delete Single Admin
 * @param ''
 * @returns Data
 * @Method DELETE
 */
const deleteSingleAdminFromDB = async (id: string) => {
  // Init Session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    // Validation
    if (!deletedAdmin) {
      throw new AppError(400, 'Admin Deleted Failed!');
    }

    // User Id
    const userId = deletedAdmin.user;
    // Find and Delete User
    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    // Validation
    if (!deletedUser) {
      throw new AppError(400, 'User Deleted Failed!');
    }
    // Session Commit or Data Save
    await session.commitTransaction();
    // End Session
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to Delete Admin Data');
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminFromDB,
  deleteSingleAdminFromDB,
};
