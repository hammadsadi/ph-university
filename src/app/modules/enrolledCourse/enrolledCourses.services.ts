/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferCourse } from '../offerCourse/offerCourse.model';
import { Student } from '../students/student.mode';
import { IEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semester.registration.model';
import { Course } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';

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
  const student = await Student.findOne({ id: userId }, { _id: 1 });
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
  // Get Course Info
  const course = await Course.findById(isOfferedCourseExist.course);

  // Get Total Credits
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist?.semesterRegistration,
  );
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist?.semesterRegistration,
        student: student._id,
      },
    },
    // Stage For Another Data Collection Lockup
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    // Unwind For Enrolled Course Data
    {
      $unwind: '$enrolledCourseData',
    },
    // Group Stage
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    // Project Stage
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  // Check Total Credits Exceeds MaxCredit
  const totalCredits =
    enrolledCourses?.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  if (
    totalCredits &&
    semesterRegistration?.maxCradit &&
    totalCredits + course?.credits > semesterRegistration?.maxCradit
  ) {
    throw new AppError(400, 'You have Exceeded Maximum Number of Credits!');
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

/**
 * @Description  Update Enrolled Course Marks
 * @param '
 * @returns Response with data
 * @Method PATCH
 */
const updateEnrolledCourseMarksFromDB = async (
  facultyId: string,
  payload: Partial<IEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
  // Check Offer Course
  const isOfferedCourseExist = await OfferCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'Offer Course Not Found');
  }

  // Check Semester Registration
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'Semester Registration Not Found!');
  }
  // Check Student
  const isStudentExist = await Student.findById(student);
  if (!isStudentExist) {
    throw new AppError(404, 'Student Not Found!');
  }

  // Get Faculty
  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(404, 'Faculty Not Found!');
  }
  // Check Course Belong to Faculty
  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    faculty: faculty?._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(403, 'You are Forbidden!');
  }

  // Dinamically Update
  const modifiedData: Record<string, unknown> = { ...courseMarks };
  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }
  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty?._id,
    modifiedData,
    { new: true },
  );

  return result;
};


export const EnrolledCourseServices = {
  saveEnrolledCourseToDB,
  updateEnrolledCourseMarksFromDB,
};
