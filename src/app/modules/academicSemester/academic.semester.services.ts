import { TAcademicSemester } from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

const academicSemesterSaveToDB = async (payload: TAcademicSemester) => {
  // Semester Name and Code Type
  type TAcademicSemesterNameCode = {
    [key: string]: string;
  };
  // Semester Name and Code
  const academicSemesterNameCode: TAcademicSemesterNameCode = {
    Authum: '01',
    Summer: '02',
    Fall: '03',
  };
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
