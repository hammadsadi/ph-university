import { model, Schema } from 'mongoose';
import { TFaculty, TFacultytName, TPresentAddress } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';
import AppError from '../../errors/AppError';

// Faculty Sub Name Schema
const facultyNameSchema = new Schema<TFacultytName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Present Address Sub Schema
const presentAddressSubSchema = new Schema<TPresentAddress>({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// Faculty Main Schema
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: facultyNameSchema,
      required: true,
    },
    designation: {
      type: String,
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
      unique: true,
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
      type: presentAddressSubSchema,
      required: true,
    },
    permanentAddress: {
      type: presentAddressSubSchema,
      required: true,
    },
    profileImage: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
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

// When Create Academic Department Check Exist or not Before Save Using Pre hooks
facultySchema.pre('save', async function (next) {
  // Is Exist or not
  const isExistFaculty = await Faculty.findOne({
    email: this.email,
  });
  if (isExistFaculty) {
    throw new AppError(400, 'This Faculty is Already Exist!');
  }
  next();
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
