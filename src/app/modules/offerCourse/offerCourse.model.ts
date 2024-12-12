import { model, Schema } from 'mongoose';
import { TOfferCourse } from './offerCourse.interface';
import { Days } from './offerCourse.contant';

const offerCourseSchema = new Schema<TOfferCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AdmissionSemester',
      required: true,
    },
    academicFecaulty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferCourse = model<TOfferCourse>(
  'OfferCourse',
  offerCourseSchema,
);
