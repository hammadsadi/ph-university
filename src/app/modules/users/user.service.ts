/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.mode';
import { generatedId } from './user.utils';
import { AdmissionSemester } from '../admissionSemester/admission.semester.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

// User Save to DB
const userSaveToDB = async (password: string, payload: TStudent) => {
  // Set User Data
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || config.default_password;

  // Find  Admission Semester info
  const admissionSemester = await AdmissionSemester.findById(
    payload.admissionSemester,
  );
  // Init Session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Genare User ID
    userData.id = await generatedId(admissionSemester);

    // Create User ( Transaction 1 )
    const createdUser = await User.create([userData], { session }); // Array Return

    // Validation
    if (!createdUser.length) {
      throw new AppError(400, 'Failed to Create User');
    }
    payload.id = createdUser[0].id;
    payload.user = createdUser[0]._id;
    // Create Student
    const result = await Student.create([payload], { session }); //  Return Array
    // Validation
    if (!result.length) {
      throw new AppError(400, 'Failed to Create Student');
    }

    // Commot or Save Data
    await session.commitTransaction();
    // End Session
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userServices = {
  userSaveToDB,
};
