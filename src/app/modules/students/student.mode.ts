import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  PresentAddress,
  StudentName,
  TStudent,
} from './student.interface';
import AppError from '../../errors/AppError';

// Student Name Sub Schema
const studentNameSchema = new Schema<StudentName>({
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
const presentAddressSchema = new Schema<PresentAddress>({
  street_address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
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

// Guardian Sub Schema
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContact: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContact: {
    type: String,
    required: true,
  },
});

// Local Guardina Sub Schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

// Student Main Schema
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: studentNameSchema,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AdmissionSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
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
    presentAddress: {
      type: presentAddressSchema,
      required: true,
    },
    permanentAddress: {
      type: presentAddressSchema,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
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

// Check Data is Exist or Not When Student Update
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  // Is Exist or not
  const isExistStudent = await Student.findOne(query);

  if (!isExistStudent) {
    console.log(isExistStudent);
    throw new AppError(404, 'This Student Data is Not Found!');
  }
  next();
});


// When Create Student Check Exist or not Before Save Using Pre hooks
studentSchema.pre('save', async function (next) {
  // Is Exist or not
  const isExistStudent = await Student.findOne({
    email: this.email,
  });
  if (isExistStudent) {
    throw new AppError(400, 'This Student is Already Exist!');
  }
  next();
});

export const Student = model('Student', studentSchema);
