import { TAcademicSemester } from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

const academicSemesterSaveToDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  academicSemesterSaveToDB,
};
