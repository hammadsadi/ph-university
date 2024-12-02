import { z } from 'zod';

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Must be String',
    }),
  }),
});

export const academicFacultyValidationSchemas = {
  createAcademicFacultyValidation,
};
