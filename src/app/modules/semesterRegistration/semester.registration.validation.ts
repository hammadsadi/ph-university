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

export const SemesterRegistrationValidationSchemas = {
  createSemesterRegistrationValidationSchema,
};
