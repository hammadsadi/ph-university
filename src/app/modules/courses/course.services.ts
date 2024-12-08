import { TCourse } from './course.interface';
import { Course } from './course.model';

/**
 *@Description Create Course
 @Method POST
 */
const courseSaveToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

/**
 *@Description Get All Course
 @Method GET
 */
const getAllCourseFromDB = async () => {
  const result = await Course.find();
  return result;
};

/**
 *@Description Get Single Course
 @Method GET
 */
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

/**
 *@Description Delete Single Course
 @Method DELETE
 */
const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const CourseServices = {
  courseSaveToDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteSingleCourseFromDB,
};
