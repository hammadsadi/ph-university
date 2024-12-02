import { TAcademicSemester } from '../academicSemester/academic.semester.interface';

// Generated ID
export const generatedId = (payload: TAcademicSemester | null) => {
  // First Time ID
  const currentId = (0).toString();
  // Increament Id
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload?.year}${payload?.code}${increamentId}`;
  return increamentId;
};
