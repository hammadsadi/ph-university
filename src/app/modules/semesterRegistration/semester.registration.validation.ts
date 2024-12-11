import { z } from 'zod';
import { semesterRegistrationtatus } from './semester.register.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterRegistrationtatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCradit: z.number(),
    maxCradit: z.number(),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterRegistrationtatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCradit: z.number().optional(),
    maxCradit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidationSchemas = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
