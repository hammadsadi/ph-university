import { TAcademicSemester } from '../academicSemester/academic.semester.interface';
import { User } from './user.model';

// Get Last User ID
const findLastUserentId = async () => {
  const lastUserId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUserId?.id ? lastUserId.id.substring(6) : undefined;
};

// Generated ID
export const generatedId = async (payload: TAcademicSemester | null) => {
  // First Time ID
  const currentId = (await findLastUserentId()) || (0).toString();
  // Increament Id
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload?.year}${payload?.code}${increamentId}`;
  return increamentId;
};
