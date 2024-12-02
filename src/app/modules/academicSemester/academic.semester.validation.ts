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

const updateAcadimicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z
      .enum([...academicSemesterMonts] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonts] as [string, ...string[]])
      .optional(),
  }),
});

export const academicSemesterValidationSchemas = {
  createAcadimicSemesterValidation,
  updateAcadimicSemesterValidation,
};
