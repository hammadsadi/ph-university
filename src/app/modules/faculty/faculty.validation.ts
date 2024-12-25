import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

// Sub Schema for Name Create
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is Required' })
    .trim()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: '{VALUE} is not Capitalized Format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is Required' })
    .regex(/^[a-zA-Z]+$/, { message: '{VALUE} is not valid' }),
});
// Sub Schema for Name Update
const updateStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: '{VALUE} is not Capitalized Format',
      },
    )
    .optional(), // Made optional
  middleName: z.string().optional(), // Already optional
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: '{VALUE} is not valid' })
    .optional(), // Made optional
});

// Create Presend Address Validation
const createPresendAddressValidation = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
});
// Update Presend Address Validation
const updatePresendAddressValidation = z.object({
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    designation: z.string().optional(),
    name: updateStudentNameValidationSchema.optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    presentAddress: updatePresendAddressValidation.optional(),
    permanentAddress: updatePresendAddressValidation.optional(),
    academicDepartment: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

// Main Zod Validaion Schema For Create
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    designation: z.string(),
    name: createUserNameValidationSchema,
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
    presentAddress: createPresendAddressValidation,
    permanentAddress: createPresendAddressValidation,
    academicDepartment: z.string(),
  }),
});

export const FacultyValidationSchemas = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
