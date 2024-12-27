/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: 'super-admin' | 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'block';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistCustomId(id: string): Promise<TUser>;
  isCheckPassword(
    myPlaintextPassword: string,
    hashPass: string,
  ): Promise<boolean>;
  isJwtIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

// User Tole Type
export type TUserRole = keyof typeof USER_ROLE;
