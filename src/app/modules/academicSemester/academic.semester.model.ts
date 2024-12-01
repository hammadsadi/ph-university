import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academic.semester.interface';
import {
  academicSemesterCode,
  academicSemesterMonts,
  academicSemesterName,
} from './academic.semester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonts,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonts,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
