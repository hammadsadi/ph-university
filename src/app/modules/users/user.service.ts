/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.mode';
import { generatedId, generateFacultyId } from './user.utils';
import { AdmissionSemester } from '../admissionSemester/admission.semester.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Faculty } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

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

/**
 *
 * @Desc Faculty Save to Database
 * @returns Data
 * @method POST
 */
const facultySaveToDB = async (payload: TFaculty) => {
  // User Data
  const userData: Partial<TUser> = {};

  // Set User Role
  userData.role = 'faculty';
  // Set User Password
  userData.password = payload?.password || config.default_password;

  // Check Academic Department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(404, 'Academic Department Not Found!');
  }

  // Start Session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    // Generate Faculty Id
    userData.id = await generateFacultyId();

    // Create User
    const newsUser = await User.create([userData], { session }); // Return Array
    // Check
    if (!newsUser.length) {
      throw new AppError(400, 'Failed To Create User!');
    }

    // Set Id and _id as a User
    payload.id = newsUser[0].id; // Gen Id
    payload.user = newsUser[0]._id; // Ref Id

    // Create Faculty
    const newFaculty = await Faculty.create([payload], { session }); // It Return Array
    // Check
    if (!newFaculty) {
      throw new AppError(400, 'Failed To Create Faculty!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  userSaveToDB,
  facultySaveToDB,
};
