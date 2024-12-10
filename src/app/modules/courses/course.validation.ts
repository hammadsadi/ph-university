import { z } from 'zod';

// Create Pre Requisite Course Validation Schema
const createPreRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Update Pre Requisite Course Validation Schema
const updatePreRequisiteValidationSchema = z.object({
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
    isDeleted: z.boolean().optional(),
  }),
});

// Update Course Validation Schema
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});


// Assign Course with Faculties Validation Schema
const assignCourseWithFacultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidationSchemas = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignCourseWithFacultiesValidationSchema,
};
