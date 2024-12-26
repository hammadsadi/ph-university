import { z } from 'zod';

// Create Enrolled Course Validation
const createEnrolledCourseValidation = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

// Update Course Marks Validation
const updateCourseMarksValidation = z.object({
  body: z.object({
    courseMarks: z.object({
      classTest1: z.string(),
      midTerm: z.string(),
      classTest2: z.string(),
      finalTerm: z.string(),
    }),
  }),
});

export const EnrolledCourseValidationSchemas = {
  createEnrolledCourseValidation,
  updateCourseMarksValidation,
};
