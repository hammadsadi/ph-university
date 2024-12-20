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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Offered Course Deleted Failed!');
  }
};
export const OfferCourseServices = {
  offerCourseSaveToDB,
  updatedOfferCourseFromDB,
  getAllOfferCourseFromDB,
  getSingleOfferCourseFromDB,
  deleteSingleOfferCourseFromDB,
};
