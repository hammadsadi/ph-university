import { z } from 'zod';
import { Days } from './offerCourse.contant';
const timeStringSchema = z.string().refine(
  (time) => {
    const timeRegex = /^(?:[1-9]|1\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
  },
  {
    message: 'Invalid Time Format Expected "HH:MM" in 24 Houes Format',
  },
);
const createOfferCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFecaulty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start Time Should be Before End Time!',
      },
    ),
});

const updateOfferCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  }),
});
export const OfferCourseValidationSchemas = {
  createOfferCourseValidationSchema,
  updateOfferCourseValidationSchema,
};
