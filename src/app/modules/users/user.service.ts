import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.mode';
import { AcademicSemester } from '../academicSemester/academic.semester.model';
import { generatedId } from './user.utils';

// User Save to DB
const userSaveToDB = async (password: string, payload: TStudent) => {
  // Set User Data
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || config.default_password;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // Genare User ID
  userData.id = generatedId(admissionSemester);

  // Create User
  const createdUser = await User.create(userData);

  // Create Student
  if (Object.keys(createdUser).length) {
    payload.id = createdUser.id;
    payload.user = createdUser._id;
    const result = await Student.create(payload);
    return result;
  }
};

export const userServices = {
  userSaveToDB,
};
