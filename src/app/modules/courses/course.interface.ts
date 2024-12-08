import { Types } from 'mongoose';

// Pre Requisite Course Type
export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDelete: boolean;
};

// Course Type
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [];
};
