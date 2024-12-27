/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { user_status } from './user.constant';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: user_status,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Example of pre for password saving
userSchema.pre('save', async function (next) {
  const userInfo = this;
  userInfo.password = await bcrypt.hash(
    userInfo.password,
    Number(config.bcrypt_solr_round),
  );
  next();
});

// Example of post for password empty
userSchema.post('save', function (doc: TUser, next) {
  doc.password = '';
  next();
});

// Static For User Validation
userSchema.statics.isUserExistCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
// Static for User Password Check
userSchema.statics.isCheckPassword = async function (
  myPlaintextPassword: string,
  hashPass: string,
) {
  return await bcrypt.compare(myPlaintextPassword, hashPass);
};

// Password Change and Jwt Time Stamp Issue Tracking for Account More Secure
userSchema.statics.isJwtIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimeStamp;
};
export const User = model<TUser, UserModel>('User', userSchema);
