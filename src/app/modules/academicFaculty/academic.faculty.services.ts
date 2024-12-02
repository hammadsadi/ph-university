import { TAcademicFaculty } from './academic.faculty.interface';
import { AcademicFaculty } from './academic.faculty.model';

// Create New Academic Feaculty
const academicFacultySaveToDB = async (payload: TAcademicFaculty) => {
  // Create Academic Faculty
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get All Academic Feaculty
const getAllAcademicFeacultyFromDB = async () => {
  // Get All Academic Feaculty
  const result = await AcademicFaculty.find();
  return result;
};

// Get Single Academic Feaculty
const getSingleAcademicFeacultyFromDB = async (id: string) => {
  // Get Single Academic Feaculty
  const result = await AcademicFaculty.findById(id);
  return result;
};

// Updated Single Academic Feaculty
const updateSingleAcademicFeacultyFromDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  // Fine and Update Semester
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const AcademicFacultyServices = {
  academicFacultySaveToDB,
  getAllAcademicFeacultyFromDB,
  getSingleAcademicFeacultyFromDB,
  updateSingleAcademicFeacultyFromDB,
};
