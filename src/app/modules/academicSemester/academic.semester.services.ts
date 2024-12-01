import { academicSemesterNameCode } from './academic.semester.constant';
import { TAcademicSemester } from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

const academicSemesterSaveToDB = async (payload: TAcademicSemester) => {
  // Check Semeser Code Valid or invalid
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code!');
  }
  // Create Semester
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  academicSemesterSaveToDB,
};
