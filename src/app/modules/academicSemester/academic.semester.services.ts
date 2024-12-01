import { academicSemesterNameCode } from './academic.semester.constant';
import { TAcademicSemester } from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

// Create New Academic Semester
const academicSemesterSaveToDB = async (payload: TAcademicSemester) => {
  // Check Semeser Code Valid or invalid
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code!');
  }
  // Create Semester
  const result = await AcademicSemester.create(payload);
  return result;
};

// Get All Academic Semester
const getAllCcademicSemesterToDB = async () => {
 
  // Get All Semester
  const result = await AcademicSemester.find();
  return result;
};


// Get Single Academic Semester
const getSingleCcademicSemesterToDB = async (id:string) => {
 
  // Get Single Semester
  const result = await AcademicSemester.findById(id);
  return result;
};

// Updated Single Academic Semester
const updateSingleCcademicSemesterToDB = async (id:string, payload: TAcademicSemester) => {
 
  // Fine and Update Semester
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {new:true});
  return result;
};
export const AcademicSemesterServices = {
  academicSemesterSaveToDB,
  getAllCcademicSemesterToDB,
  getSingleCcademicSemesterToDB,
  updateSingleCcademicSemesterToDB,
};
