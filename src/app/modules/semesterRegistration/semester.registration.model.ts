import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semester.registration.interface';
import { semesterRegistrationtatus } from './semester.register.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AdmissionSemester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationtatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCradit: {
      type: Number,
      default: 3,
    },
    maxCradit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
