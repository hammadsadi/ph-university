import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdmissionSemester } from '../admissionSemester/admission.semester.model';
import { TSemesterRegistration } from './semester.registration.interface';
import { SemesterRegistration } from './semester.registration.model';
/**
 * @Description  Create Semester Registration Logic
 * @param ''
 * @returns Response with data
 * @Method POST
 */

const semesterRegistrationDataSaveToDB = async (
  payload: TSemesterRegistration,
) => {
  // Check If there any Registred Semester That is Already 'UPCOMING' or "ONGONING"
  const semesterRegistrationStatusScheck = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (semesterRegistrationStatusScheck) {
    throw new AppError(
      400,
      `There is Already an ${semesterRegistrationStatusScheck.status} Registred Semester!`,
    );
  }
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

/**
 * @Description  Get Semester Registration
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const semesterRegistrationDataGetFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

/**
 * @Description  Get Single Semester Registration
 * @param ''
 * @returns Response with data
 * @Method GET
 */

const singleSemesterRegistrationDataGetFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

/**
 * @Description  Update Single Semester Registration
 * @param ''
 * @returns Response with data
 * @Method PATCH
 */

const singleSemesterRegistrationDataUpdateFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const checkSemesterRegistration = await SemesterRegistration.findById(id);
  // Check Data Exist or Not
  if (!checkSemesterRegistration) {
    throw new AppError(400, 'This Semester is Not Found!');
  }
  // Check Semester Register Status
  if (checkSemesterRegistration.status === 'ENDED') {
    throw new AppError(
      400,
      `This Semester is Already ${checkSemesterRegistration.status}`,
    );
  }
};

export const SemesterRegistrationServices = {
  semesterRegistrationDataSaveToDB,
  semesterRegistrationDataGetFromDB,
  singleSemesterRegistrationDataGetFromDB,
  singleSemesterRegistrationDataUpdateFromDB,
};
