import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
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
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .pagination()
    .sort()
    .fields();
  const result = await courseQuery.modelQuery;
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
