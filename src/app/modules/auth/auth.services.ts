import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
/**
 *@Description Login User
 @Method POST
 */
const userLogin = async (payload: TLogin) => {
  // Check User
  const user = await User.findOne({ id: payload.id });
  if (!user) {
    throw new AppError(400, 'User Not Found!');
  }

  // Check User Deleted Or Not
  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(400, 'User Not Found Bacuase User is Deleted!');
  }
  // Check User Deleted Or Not
  const accountStatus = user.status;
  if (accountStatus === 'block') {
    throw new AppError(400, 'User Blocked!');
  }

  // Check User Password
  const checkPass = await bcrypt.compare(payload.password, user.password);
  console.log(checkPass);
  return '';
};

export const AuthServices = {
  userLogin,
};
