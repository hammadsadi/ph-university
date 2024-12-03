import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// Create New Academic Department
const academicDepartmentSaveToDB = async (payload: TAcademicDepartment) => {
  // Create Academic Department
  const result = await AcademicDepartment.create(payload);
  return result;
};

// Get All Academic Department
const getAllAcademicDepartmentFromDB = async () => {
  // Get All Academic Department
  const result = await AcademicDepartment.find();
  return result;
};

// Get Single Academic Department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  // Get Single Academic Department
  const result = await AcademicDepartment.findById(id);
  return result;
};

// Updated Single Academic Department
const updateSingleAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  // Find and Update Academic Department
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const AcademicDepartmentServices = {
  academicDepartmentSaveToDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
};
