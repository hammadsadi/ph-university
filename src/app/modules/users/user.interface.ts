/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'block';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistyCustomId(id: string): Promise<TUser>;
  isCheckPassword(
    myPlaintextPassword: string,
    hashPass: string,
  ): Promise<boolean>;
}

// User Tole Type
export type TUserRole = keyof typeof USER_ROLE;
