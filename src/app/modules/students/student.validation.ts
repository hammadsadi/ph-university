import { z } from 'zod';

// Sub Schema for Name
const userNameValidationSchema = z.object({
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

// Sub Schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father First Name is Required!' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is Required' }),
  fatherContact: z.string().min(1, { message: 'Father Contact is Required' }),
  motherName: z.string().min(1, { message: 'Mother Name is Required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is Required' }),
  motherContact: z.string().min(1, { message: 'Father Contact is Required' }),
});

// Sub Schema for Present Address
const presentAddressValidationSchema = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
});

// Sub Schema for Loca Guardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is Required!' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is Required!' }),
  contact: z
    .string()
    .min(1, { message: 'Local Guardian Contact is Required!' }),
});

// Main Schema for Student
const createValidationStudentSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      email: z
        .string()
        .email({ message: '{VALUE} is not a valid email format' }),
      gender: z.enum(['Male', 'Female'], {
        errorMap: () => ({
          message: 'You Can Select Two Types: Male or Female',
        }),
      }),
      dateOfBirth: z.date(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: presentAddressValidationSchema,
      permanentAddress: presentAddressValidationSchema,
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
    }),
  }),
});

export const studentValidationSchemas = {
  createValidationStudentSchema,
};
