/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculties } from './course.interface';
import { Course, CourseFaculties } from './course.model';
import AppError from '../../errors/AppError';

/**
 *@Description Create Course
 @Method POST
 */
const courseSaveToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

/**
 *@Description Assign Faculties With Course
 @Method PUT
 */
const assignFacultiesWithCoursesIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
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
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

/**
 *@Description Update Course
 @Method Patch
 */
const updateSingleCourseFromDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  // Init Session
  const session = await mongoose.startSession();

  try {
    // Start Transaction
    session.startTransaction();
    const { preRequisiteCourses, ...remainingCouresInfo } = payload;
    const updatedBasicCourse = await Course.findByIdAndUpdate(
      id,
      remainingCouresInfo,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    // Check
    if (!updatedBasicCourse) {
      throw new AppError(400, 'Basic Course Info Updated Failed!');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Check Pre Requisite Exist or Not
      // Filter out the Deleted Field
      const deletedRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { course: { $in: deletedRequisite } } },
        },
        { new: true, runValidators: true, session },
      );

      // Check
      if (!deletedPreRequisiteCourses) {
        throw new AppError(400, 'Pre Requisite Course Deleted Failed!');
      }

      // Filter out New Pre Requisite Courses
      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const addNewPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      // Check
      if (!addNewPreRequisiteCourse) {
        throw new AppError(400, 'Pre Requisite Course Updated Failed!');
      }
    }

    // Get Again Data
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Course Updated Failed!');
  }
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
  updateSingleCourseFromDB,
  assignFacultiesWithCoursesIntoDB,
};
