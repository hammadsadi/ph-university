import { TStudent } from './student.interface';
import { Student } from './student.mode';

// Get All Student
const getAllStudentFromDB = async () => {
  // Get All Student
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Get Single Student
const getSingleStudentFromDB = async (id: string) => {
  // Get Single Academic Feaculty
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Updated Single Student
const updateSingleStudentFromDB = async (id: string, payload: TStudent) => {
  // Fine and Update Semester
  const result = await Student.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
};
