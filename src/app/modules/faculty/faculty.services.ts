import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

/**
 * @Description  Get All Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getAllFacultyFromDB = async () => {
  const result = await Faculty.find()
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

/**
 * @Description  Get Single Feaculty
 * @param '
 * @returns Data
 * @Method GET
 */
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id })
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

/**
 * @Description  Update Single Feaculty
 * @param '
 * @returns Data
 * @Method PATCH
 */
const updateSingleFacultyFromDB = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, presentAddress, permanentAddress, ...remainingPayload } =
    payload;

  // Modefied Data
  const modefiedData: Record<string, unknown> = { ...remainingPayload };

  // Check Name data
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modefiedData[`name.${key}`] = value;
    }
  }
  // Check Present Address data
  if (presentAddress && Object.keys(presentAddress).length) {
    for (const [key, value] of Object.entries(presentAddress)) {
      modefiedData[`presentAddress.${key}`] = value;
    }
  }
  // Check Permanent Address data
  if (permanentAddress && Object.keys(permanentAddress).length) {
    for (const [key, value] of Object.entries(permanentAddress)) {
      modefiedData[`permanentAddress.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modefiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyFromDB,
};
