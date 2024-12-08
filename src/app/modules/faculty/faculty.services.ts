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

export const FacultyServices = {
  getAllFacultyFromDB,
};
