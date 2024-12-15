/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'block';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistCustomId(id: string): Promise<TUser>;
  isCheckPassword(
    myPlaintextPassword: string,
    hashPass: string,
  ): Promise<boolean>;
}

// User Tole Type
export type TUserRole = keyof typeof USER_ROLE;
