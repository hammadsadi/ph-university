import { z } from 'zod';

// Create Pre Requisite Course Validation Schema
const createPreRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Create Course Validation Schema
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(createPreRequisiteValidationSchema).optional(),
  }),
});

export const CourseValidationSchemas = {
  createCourseValidationSchema,
};
