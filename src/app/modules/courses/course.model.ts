import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculties,
  TPreRequisiteCourses,
} from './course.interface';
import AppError from '../../errors/AppError';

// Pre Requisite Course Schema
const preRequisiteSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    preRequisiteCourses: [preRequisiteSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// When Create Course Check Exist or not Before Save Using Pre hooks
courseSchema.pre('save', async function (next) {
  // Is Exist or not
  const isExistCourse = await Course.findOne({
    title: this.title,
  });
  if (isExistCourse) {
    throw new AppError(400, 'This Course is Already Exist!');
  }
  next();
});

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculties>(
  'CourseFaculty',
  courseFacultiesSchema,
);