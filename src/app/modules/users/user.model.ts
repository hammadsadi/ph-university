/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'block'],
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
userSchema.statics.isUserExistyCustomId = async function (id: string) {
  return await User.findOne({ id });
};
// Static for User Password Check
userSchema.statics.isCheckPassword = async function (
  myPlaintextPassword: string,
  hashPass: string,
) {
  return await bcrypt.compare(myPlaintextPassword, hashPass);
};

export const User = model<TUser, UserModel>('User', userSchema);
