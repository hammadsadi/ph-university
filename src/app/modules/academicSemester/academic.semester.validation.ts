import z from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonts,
  academicSemesterName,
} from './academic.semester.constant';
const createAcadimicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...academicSemesterMonts] as [string, ...string[]]),
    endMonth: z.enum([...academicSemesterMonts] as [string, ...string[]]),
  }),
});

export const academicSemesterValidationSchemas = {
  createAcadimicSemesterValidation,
};
