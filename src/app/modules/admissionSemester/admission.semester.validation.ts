import z from 'zod';
import {
  admissionSemesterCode,
  admissionSemesterMonts,
  admissionSemesterName,
} from './admission.semester.constant';
const createAdmissionSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...admissionSemesterName] as [string, ...string[]]),
    code: z.enum([...admissionSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...admissionSemesterMonts] as [string, ...string[]]),
    endMonth: z.enum([...admissionSemesterMonts] as [string, ...string[]]),
  }),
});

const updateAdmissionSemesterValidation = z.object({
  body: z.object({
    name: z
      .enum([...admissionSemesterName] as [string, ...string[]])
      .optional(),
    code: z
      .enum([...admissionSemesterCode] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    startMonth: z
      .enum([...admissionSemesterMonts] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...admissionSemesterMonts] as [string, ...string[]])
      .optional(),
  }),
});

export const admissionSemesterValidationSchemas = {
  createAdmissionSemesterValidation,
  updateAdmissionSemesterValidation,
};
