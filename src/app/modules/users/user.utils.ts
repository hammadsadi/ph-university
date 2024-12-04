import { TAdmissionSemester } from '../admissionSemester/admission.semester.interface';
import { User } from './user.model';

// Get Last User ID
const findLastUserentId = async () => {
  const lastUserId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUserId?.id ? lastUserId.id : undefined;
};

// Generated ID
export const generatedId = async (payload: TAdmissionSemester | null) => {
  // First Time Default ID
  let currentId = (0).toString();
  const lastStudentId = await findLastUserentId();
  // Last Student Semester 2043010001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentSemesterYear = payload?.year;
  // Check
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  // Increament Id
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload?.year}${payload?.code}${increamentId}`;
  return increamentId;
};
