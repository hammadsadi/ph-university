import AppError from '../../errors/AppError';
import { AdmissionSemester } from '../admissionSemester/admission.semester.model';
import { TSemesterRegistration } from './semester.registration.interface';
import { SemesterRegistration } from './semester.registration.model';
/**
 * @Description  Create Semester Logic
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const semesterRegistrationDataSaveToDB = async (
  payload: TSemesterRegistration,
) => {
  // Check academicSemester Exist or Not
  const academicSemester = payload.academicSemester;
  const academicSemesterExist =
    await AdmissionSemester.findById(academicSemester);
  if (!academicSemesterExist) {
    throw new AppError(404, 'Admission Semester Not Found!');
  }

  // Check Semester Registration Already Exist or Not
  const semesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (semesterRegistrationExist) {
    throw new AppError(404, 'Semester Registration Already Exist!');
  }
  // Create Semester Registration
  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationServices = {
  semesterRegistrationDataSaveToDB,
};
