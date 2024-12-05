import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.mode';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';

// Get All Student
const getAllStudentFromDB = async () => {
  // Get All Student
  const result = await Student.find()
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
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Updated Single Student
const updateSingleStudentFromDB = async (id: string, payload: TStudent) => {
  // Fine and Update Semester
  const result = await Student.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete Single Student
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
  }
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
