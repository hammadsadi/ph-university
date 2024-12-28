/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacujltySearchAbleFileds } from './faculty.constant';

/**
 * @Description  Get All Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find()
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(FacujltySearchAbleFileds)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

/**
 * @Description  Get Single Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id)
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

/**
 * @Description  Update Single Feaculty
 * @param '
 * @returns Data
 * @Method PATCH
 */
const updateSingleFacultyFromDB = async (
  id: string,
  payload: Partial<TFaculty>,
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

  const result = await Faculty.findByIdAndUpdate(id, modefiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

/**
 * @Description  Delete Single Feaculty
 * @param '
 * @returns Data
 * @Method DELETE
 */
const deleteSingleFacultyFromDB = async (id: string) => {
  // Init Session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    // Validation
    if (!deletedFaculty) {
      throw new AppError(400, 'Faculty Deleted Failed!');
    }
    // User Id
    const userId = deletedFaculty.user;

    // Find and Delete User
    const deletedUser = await User.findByIdAndUpdate(
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
    return deletedFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to Delete Faculty Data');
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyFromDB,
  deleteSingleFacultyFromDB,
};
