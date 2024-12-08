import { model, Schema } from 'mongoose';
import { TAdmin, TAdminName, TAdminPresentAddress } from './admin.interface';
import { BloodGroup, Gender } from './admin.contant';
import AppError from '../../errors/AppError';

// Name Sub Schema
const adminNameSubSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Present Address Sub Schema
const presentAddressSubschema = new Schema<TAdminPresentAddress>({
  street_address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
});
// Main Schema
const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: adminNameSubSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
      required: true,
    },
    presentAddress: {
      type: presentAddressSubschema,
      required: true,
    },
    permanentAddress: {
      type: presentAddressSubschema,
      required: true,
    },
    profileImg: {
      type: String,
      default: null,
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

// When Create Admin Check Exist or not Before Save Using Pre hooks
adminSchema.pre('save', async function (next) {
  // Is Exist or not
  const isExistAdmin = await Admin.findOne({
    email: this.email,
  });
  if (isExistAdmin) {
    throw new AppError(400, 'This Admin is Already Exist!');
  }
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
