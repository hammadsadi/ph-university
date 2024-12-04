import { Student } from './student.mode';

// Get All Student
const getAllStudentFromDB = async () => {
  // Get All Student
  const result = await Student.find();
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
};
