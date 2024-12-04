import { model, Schema } from 'mongoose';
import { TAdmissionSemester } from './admission.semester.interface';
import {
  admissionSemesterCode,
  admissionSemesterMonts,
  admissionSemesterName,
} from './admission.semester.constant';

const admissionSemesterSchema = new Schema<TAdmissionSemester>(
  {
    name: {
      type: String,
      enum: admissionSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: admissionSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: admissionSemesterMonts,
      required: true,
    },
    endMonth: {
      type: String,
      enum: admissionSemesterMonts,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Check Data Exist or Not Using Hook
admissionSemesterSchema.pre('save', async function (next) {
  const isExist = await AdmissionSemester.findOne({
    name: this.name,
    year: this.year,
  });

  // Validation
  if (isExist) {
    throw new Error('Semester Already Exist!');
  }
  next();
});
export const AdmissionSemester = model<TAdmissionSemester>(
  'AdmissionSemester',
  admissionSemesterSchema,
);
