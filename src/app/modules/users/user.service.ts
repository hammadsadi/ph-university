/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.mode';
import { generateAdminId, generatedId, generateFacultyId } from './user.utils';
import { AdmissionSemester } from '../admissionSemester/admission.semester.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Faculty } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Admin } from '../admin/admin.model';
import { tokenVerify } from '../auth/auth.utils';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';

// User Save to DB
const userSaveToDB = async (password: string, payload: TStudent, file: any) => {
  // Set User Data
  const userData: Partial<TUser> = {};
  // Set Student Role
  userData.role = 'student';
  // Set Student Email
  userData.email = payload?.email;
  userData.password = password || config.default_password;

  // Find  Admission Semester info
  const admissionSemester = await AdmissionSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(404, 'Admission Semester Not Found!');
  }

  // Find Department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(404, 'Academic Department Not Found!');
  }

  // Set Academic Faculty Data
  payload.academicFaculty = academicDepartment.academicFaculty;

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

    // Check Image
    if (file) {
      const filePath = file?.path;
      const imgName = `${userData?.id}-${payload?.name.firstName}`;
      // Cloudinary Image Upload
      const profileImage = await uploadImageToCloudinary(imgName, filePath);
      // Set Image Url
      payload.profileImage = profileImage?.secure_url as string;
    }

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

/**
 *
 * @Desc Faculty Save to Database
 * @returns Data
 * @method POST
 */
const facultySaveToDB = async (payload: TFaculty, file: any) => {
  // User Data
  const userData: Partial<TUser> = {};

  // Set Faculty Role
  userData.role = 'faculty';
  // Set Faculty Email
  userData.email = payload?.email;
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

    // Check File
    if (file) {
      const filePath = file?.path;
      const imgName = `${userData?.id}-${payload?.name.firstName}`;
      // Cloudinary Image Upload
      const profileImage = await uploadImageToCloudinary(imgName, filePath);
      // Set Image Url
      payload.profileImage = profileImage?.secure_url as string;
    }

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

/**
 *
 * @Desc Admin Save to Database
 * @returns Data
 * @method POST
 */
const adminSaveToDB = async (payload: TFaculty, file: any) => {
  // User Data
  const userData: Partial<TUser> = {};

  // Set Admin Role
  userData.role = 'admin';
  // Set Admin Email
  userData.email = payload?.email;
  // Set User Password
  userData.password = payload?.password || config.default_password;

  // Start Session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    // Generate Faculty Id
    userData.id = await generateAdminId();

    // Check File
    if (file) {
      const filePath = file?.path;
      const imgName = `${userData?.id}-${payload?.name.firstName}`;
      // Cloudinary Image Upload
      const profileImage = await uploadImageToCloudinary(imgName, filePath);
      // Set Image Url
      payload.profileImage = profileImage?.secure_url as string;
    }

    // Create User
    const newsUser = await User.create([userData], { session }); // Return Array
    // Check
    if (!newsUser.length) {
      throw new AppError(400, 'Failed To Create User!');
    }

    // Set Id and _id as a User
    payload.id = newsUser[0].id; // Gen Id
    payload.user = newsUser[0]._id; // Ref Id

    // Create Admin
    const newAdmin = await Admin.create([payload], { session }); // It Return Array
    // Check
    if (!newAdmin) {
      throw new AppError(400, 'Failed To Create Admin!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

/**
 *
 * @Desc Get Me from Database
 * @returns Data
 * @method GET
 */
const getMeFromDb = async (userId: string, role: string) => {
  let result = null;
  // Check Role and Set Data
  if (role === 'student') {
    result = await Student.findOne({ id: userId })
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment');
  }
  // Check Role and Set Data
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  // Check Role and Set Data
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  return result;
};

/**
 *
 * @Desc Update User Status From from Database
 * @returns Data
 * @method POST
 */
const userStatusUpdate = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
export const userServices = {
  userSaveToDB,
  facultySaveToDB,
  adminSaveToDB,
  getMeFromDb,
  userStatusUpdate,
};
