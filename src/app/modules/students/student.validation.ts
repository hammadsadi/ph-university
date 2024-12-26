import { z } from 'zod';

// Sub Schema for Name Create
const createStudentNameValidationSchema = z.object({
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
const updateStudentNameValidationSchema = z
  .object({
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
  })
  .optional();

// Sub Schema for Guardian Create
const createGuardianValidationSchema = z.object({
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
// Sub Schema for Guardian Update
const updateGuardianValidationSchema = z
  .object({
    fatherName: z.string().optional(), // Already optional
    fatherOccupation: z.string().optional(), // Already optional
    fatherContact: z.string().optional(), // Already optional
    motherName: z.string().optional(), // Already optional
    motherOccupation: z.string().optional(), // Already optional
    motherContact: z.string().optional(), // Already optional
  })
  .optional();

// Sub Schema for Present Address Create
const createPresentAddressValidationSchema = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
});
// Sub Schema for Present Address Update
const updatePresentAddressValidationSchema = z
  .object({
    street_address: z.string().optional(), // Made optional
    city: z.string().optional(), // Made optional
    state: z.string().optional(), // Made optional
    postal_code: z.string().optional(), // Made optional
    country: z.string().optional(), // Made optional
  })
  .optional();

// Sub Schema for Loca Guardian Create
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is Required!' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is Required!' }),
  contact: z
    .string()
    .min(1, { message: 'Local Guardian Contact is Required!' }),
});

// Sub Schema for Loca Guardian Update
const updateLocalGuardianValidationSchema = z
  .object({
    name: z.string().optional(), // Made optional
    occupation: z.string().optional(), // Made optional
    contact: z.string().optional(), // Made optional
  })
  .optional();

// Main Schema for Student Create
const createValidationStudentSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createStudentNameValidationSchema,
      email: z
        .string()
        .email({ message: '{VALUE} is not a valid email format' }),
      gender: z.enum(['Male', 'Female'], {
        errorMap: () => ({
          message: 'You Can Select Two Types: Male or Female',
        }),
      }),
      dateOfBirth: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: createPresentAddressValidationSchema,
      permanentAddress: createPresentAddressValidationSchema,
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
    }),
  }),
});

const updateValidationStudentSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateStudentNameValidationSchema,
      email: z
        .string()
        .email({ message: '{VALUE} is not a valid email format' })
        .optional(), // Made optional
      gender: z
        .enum(['Male', 'Female'], {
          errorMap: () => ({
            message: 'You Can Select Two Types: Male or Female',
          }),
        })
        .optional(), // Made optional
      dateOfBirth: z.string().optional(), // Made optional
      admissionSemester: z.string().optional(), // Made optional
      academicDepartment: z.string().optional(), // Made optional
      contactNo: z.string().optional(), // Made optional
      emergencyContactNo: z.string().optional(), // Made optional
      presentAddress: updatePresentAddressValidationSchema,
      permanentAddress: updatePresentAddressValidationSchema,
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(), // Made optional
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
    }),
  }),
});

export const studentValidationSchemas = {
  createValidationStudentSchema,
  updateValidationStudentSchema,
};
