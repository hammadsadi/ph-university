import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.mode';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';

// Get All Student
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  // Check Query
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  // Get All Student
  const result = await Student.find({
    $or: [
      'email',
      'name.firstName',
      'name.lastName',
      'presentAddress.city',
      'permanentAddress.city',
    ].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Get Single Student
const getSingleStudentFromDB = async (id: string) => {
  // Get Single Academic Feaculty
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

/**
 * @Description  Updated Single Student
 * @param id
 * @returns Data
 * @Method Patch
 */
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const {
    name,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    ...remaingPayload
  } = payload;

  // Empty Object For Store Data
  const modefiedData: Record<string, unknown> = { ...remaingPayload };

  // Set Data for name none Primitive Data Using For loop
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modefiedData[`name.${key}`] = value;
    }
  }
  // Set Data for Present Address none Primitive Data Using For loop
  if (presentAddress && Object.keys(presentAddress).length) {
    for (const [key, value] of Object.entries(presentAddress)) {
      modefiedData[`presentAddress.${key}`] = value;
    }
  }
  // Set Data for Permanent Address none Primitive Data Using For loop
  if (permanentAddress && Object.keys(permanentAddress).length) {
    for (const [key, value] of Object.entries(permanentAddress)) {
      modefiedData[`permanentAddress.${key}`] = value;
    }
  }
  // Set Data for Guardina none Primitive Data Using For loop
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modefiedData[`guardian.${key}`] = value;
    }
  }
  // Set Data for Local Guardian none Primitive Data Using For loop
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modefiedData[`localGuardian.${key}`] = value;
    }
  }
  // Find and Update Student Data
  const result = await Student.findOneAndUpdate({ id }, modefiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

/**
 * @Description Delete Single Student
 * @param id
 * @returns Data
 * @Method DELETE
 */
const deleteSingleStudentFromDB = async (id: string) => {
  // Init Session
  const session = await mongoose.startSession();
  try {
    // Session Start
    session.startTransaction();
    // Find and Delete Student
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    // Validation
    if (!deletedStudent) {
      throw new AppError(400, 'Student Deleted Failed!');
    }

    // Find and Delete User
    const deletedUser = await User.findOneAndUpdate(
      { id },
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
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to Delete Student Data');
  }
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
