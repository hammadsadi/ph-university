import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

// Pre Requisite Course Schema
const preRequisiteSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);
