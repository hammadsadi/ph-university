import { admissionSemesterNameCode } from './admission.semester.constant';
import { TAdmissionSemester } from './admission.semester.interface';
import { AdmissionSemester } from './admission.semester.model';

// Create New Academic Semester
const admissionSemesterSaveToDB = async (payload: TAdmissionSemester) => {
  // Check Semeser Code Valid or invalid
  if (admissionSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code!');
  }
  // Create Semester
  const result = await AdmissionSemester.create(payload);
  return result;
};

// Get All Admission Semester
const getAllAdmissionSemesterToDB = async () => {
  // Get All Semester
  const result = await AdmissionSemester.find();
  return result;
};

// Get Single Admission Semester
const getSingleAdmissionSemesterToDB = async (id: string) => {
  // Get Single Semester
  const result = await AdmissionSemester.findById(id);
  return result;
};

// Updated Single Admission Semester
const updateSingleAdmissionSemesterToDB = async (
  id: string,
  payload: TAdmissionSemester,
) => {
  // Check Validation
  if (
    payload.name &&
    payload.code &&
    admissionSemesterNameCode[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  // Fine and Update Semester
  const result = await AdmissionSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const AdmissioncSemesterServices = {
  admissionSemesterSaveToDB,
  getAllAdmissionSemesterToDB,
  getSingleAdmissionSemesterToDB,
  updateSingleAdmissionSemesterToDB,
};
