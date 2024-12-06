import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Must be String',
      required_error: 'Academic Department Name is Required!',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Feaculty is Required!',
    }),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty Must be String',
        required_error: 'Academic Department is Required!',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic Feaculty is Required!',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidationSchemas = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
