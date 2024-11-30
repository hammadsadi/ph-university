import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.mode';

// User Save to DB
const userSaveToDB = async (password: string, userInfo: TStudent) => {
  // Set User Data
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || config.default_password;
  // Genare User ID
  userData.id = '2030001';

  // Create User
  const createdUser = await User.create(userData);

  // Create Student
  if (Object.keys(createdUser).length) {
    userInfo.id = createdUser.id;
    userInfo.user = createdUser._id;
    const result = await Student.create(userInfo);
    return result;
  }
};

export const userServices = {
  userSaveToDB,
};
