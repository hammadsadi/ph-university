import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  PresentAddress,
  StudentName,
  TStudent,
} from './student.interface';

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
const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: true,
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
  dateOfBirth: {
    type: String,
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
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
});

export const Student = model('Student', studentSchema);
