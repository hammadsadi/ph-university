/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academic.faculty.model';
import { Course } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semester.registration.model';
import { TOfferCourse } from './offerCourse.interface';
import { OfferCourse } from './offerCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';
import { Student } from '../students/student.mode';

/**
 *@Description Create Offer Course
 @Method POST
 */
const offerCourseSaveToDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFecaulty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // Check Semester Registration
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'Semester Registration Not Found!');
  }

  const admissionSemester = isSemesterRegistrationExist.academicSemester;
  // Check Academic Fecaulty
  const isAcademicFecaultyExist =
    await AcademicFaculty.findById(academicFecaulty);
  if (!isAcademicFecaultyExist) {
    throw new AppError(404, 'Academic Faculty Not Found!');
  }

  // Check Academic Department
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(404, 'Academic Department Not Found!');
  }

  // Check Course
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(404, 'Course Not Found!');
  }

  // Check Faculty
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(404, 'Faculty Not Found!');
  }

  // Check if the Department is Belong to The Faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty: academicFecaulty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      404,
      `This  ${isAcademicDepartmentExist.name} is not belong to this ${isAcademicFecaultyExist.name}`,
    );
  }

  // Check Requested Offer Course Section Exist
  const isOfferCourseSectionExist = await OfferCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isOfferCourseSectionExist) {
    throw new AppError(400, `Offered Course With Section Already Exist!`);
  }

  // Get All Offered Course For Validation
  const assignedSchedule = await OfferCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = {
    startTime,
    endTime,
    days,
  };
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      400,
      `This Feaculty Is Not Avilable at that time! Chose other time or day!`,
    );
  }
  const result = await OfferCourse.create({ ...payload, admissionSemester });
  return result;
};

/**
 *@Description Updated Offer Course
 @Method PATCH
 */
const updatedOfferCourseFromDB = async (
  id: string,
  payload: Pick<TOfferCourse, 'faculty' | 'startTime' | 'endTime' | 'days'>,
) => {
  const { faculty, startTime, endTime, days } = payload;

  // Check Offered Course
  const isExistOfferedCourse = await OfferCourse.findById(id);
  if (!isExistOfferedCourse) {
    throw new AppError(404, `This Offered Course Not Found!`);
  }

  // Check Feaculty
  const isExistFaculty = await Faculty.findById(faculty);
  if (!isExistFaculty) {
    throw new AppError(404, `This Faculty Not Found!`);
  }

  const semesterRegistration = isExistOfferedCourse.semesterRegistration;
  const checkSemesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (checkSemesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      400,
      `You Cannot Update This Offered Course Because it is ${checkSemesterRegistrationStatus?.status}`,
    );
  }
  // Get All Offered Course For Validation
  const assignedSchedule = await OfferCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedule = {
    startTime,
    endTime,
    days,
  };
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      400,
      `This Feaculty Is Not Avilable at that time! Chose other time or day!`,
    );
  }
  // Now Update Offered Course
  const result = await OfferCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

/**
 *@Description Get All Offer Course
 @Method GET
 */
const getAllOfferCourseFromDB = async () => {
  // GET ALL Offered Course
  const result = await OfferCourse.find()
    .populate('semesterRegistration')
    .populate('admissionSemester')
    .populate('academicFecaulty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty');
  return result;
};
/**
 *@Description Get Single Offer Course
 @Method GET
 */
const getSingleOfferCourseFromDB = async (id: string) => {
  // GET Single Offered Course
  const result = await OfferCourse.findById(id)
    .populate('semesterRegistration')
    .populate('admissionSemester')
    .populate('academicFecaulty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty');
  return result;
};

/**
 *@Description Delete Single Offer Course
 @Method DELETE
 */
const deleteSingleOfferCourseFromDB = async (id: string) => {
  // Start Session
  const session = await mongoose.startSession();

  try {
    // Start Transaction
    session.startTransaction();

    // Check Offered Course Exist
    const checkOfferedCourseExist = await OfferCourse.findById(id);
    if (!checkOfferedCourseExist) {
      throw new AppError(404, `This Offered Course Not Found!`);
    }

    // Get Semester Registration ID
    const semesterRegistration = checkOfferedCourseExist.semesterRegistration;
    // Check Semester Registration Status
    const checkSemesterRegistrationStatus = await SemesterRegistration.findById(
      {
        _id: semesterRegistration,
      },
    );

    if (checkSemesterRegistrationStatus?.status !== 'UPCOMING') {
      throw new AppError(
        400,
        `Offered course can not update ! because the semester ${checkSemesterRegistrationStatus?.status}`,
      );
    }

    // Delete All The Associated Pffered Course
    const deletedOfferedCourses = await OfferCourse.deleteMany(
      {
        semesterRegistration,
      },
      { session },
    );
    // Check Offered Course Deleted or Not
    if (!deletedOfferedCourses) {
      throw new AppError(400, `Offered course Deleted Failed!`);
    }

    // Deleted Semester Registration
    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(
        {
          _id: semesterRegistration,
        },
        { session },
      );
    // Check Semester Registration Deleted or Not
    if (!deletedSemisterRegistration) {
      throw new AppError(400, `Semester Registration Deleted Failed!`);
    }
    // Commit
    await session.commitTransaction();
    // End Session
    await session.endSession();
    return deletedOfferedCourses;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Offered Course Deleted Failed!');
  }
};

/**
 *@Description My Offer Course
 @Method GET
 */
const myOfferCourseFromDB = async (userId: string) => {
  // Find Student
  const isExistStudent = await Student.findOne({ id: userId });
  if (!isExistStudent) {
    throw new AppError(404, 'Student Not Found!');
  }
  // Find Current ONGOING Semester
  const currentOnGoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: 'ONGOING',
    },
  );
  if (!currentOnGoingRegistrationSemester) {
    throw new AppError(404, 'There is no Ongoing Semester Registration!');
  }

  // Find Match Offer Course
  const result = await OfferCourse.aggregate([
    {
      $match: {
        semesterRegistration: currentOnGoingRegistrationSemester._id,
        academicFecaulty: isExistStudent.academicFaculty,
        academicDepartment: isExistStudent.academicDepartment,
      },
    },
    // Lookup Stage
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    // Unwind For Course Array
    {
      $unwind: '$course',
    },
    // Lookup For Get Enrolled Courses
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOnGoingRegistrationSemester:
            currentOnGoingRegistrationSemester._id,
          currentStudent: isExistStudent._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentOnGoingRegistrationSemester',
                    ],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    // Lookup Stage For Completed Course
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: isExistStudent._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourse',
      },
    },
    // Stage For Completed Course Id
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourse',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    // Stage For Add Fields
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    // Match Stage
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ]);

  return result;
};

export const OfferCourseServices = {
  offerCourseSaveToDB,
  updatedOfferCourseFromDB,
  getAllOfferCourseFromDB,
  getSingleOfferCourseFromDB,
  deleteSingleOfferCourseFromDB,
  myOfferCourseFromDB,
};
