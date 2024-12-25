/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferCourse } from '../offerCourse/offerCourse.model';
import { Student } from '../students/student.mode';
import { IEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';

/**
 * @Description  Save Enrolled Course
 * @param '
 * @returns Response with data
 * @Method POST
 */
const saveEnrolledCourseToDB = async (
  userId: string,
  payload: IEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  // Check Offer Course
  const isOfferedCourseExist = await OfferCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'Offer Course Not Found');
  }
  // Capacity Validation
  if (isOfferedCourseExist?.maxCapacity <= 0) {
    throw new AppError(400, 'Room is Full!');
  }
  // Get Student Info
  const student = await Student.findOne({ id: userId }).select('_id');
  if (!student) {
    throw new AppError(404, 'Student Not Found');
  }
  // Check Student Already Enrolled Or Not
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(400, 'Student is Already Enrolled!');
  }

  // Transaction and Roleback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist?.semesterRegistration,
          admissionSemester: isOfferedCourseExist?.admissionSemester,
          academicFaculty: isOfferedCourseExist?.academicFecaulty,
          academicDepartment: isOfferedCourseExist?.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExist?.course,
          student: student?._id,
          faculty: isOfferedCourseExist?.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );
    const prevMaxCapacity = isOfferedCourseExist.maxCapacity;
    await OfferCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: prevMaxCapacity - 1,
    });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const EnrolledCourseServices = {
  saveEnrolledCourseToDB,
};
