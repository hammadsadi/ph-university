import { z } from 'zod';

// Create Enrolled Course Validation
const createEnrolledCourseValidation = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const EnrolledCourseValidationSchemas = {
  createEnrolledCourseValidation,
};
