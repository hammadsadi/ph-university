import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academic.faculty.model';
import { Course } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semester.registration.model';
import { TOfferCourse } from './offerCourse.interface';
import { OfferCourse } from './offerCourse.model';

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

  const result = await OfferCourse.create({ ...payload, admissionSemester });
  return result;
};

export const OfferCourseServices = {
  offerCourseSaveToDB,
};
