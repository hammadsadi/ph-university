import { z } from 'zod';
import { BloodGroup, Gender } from './admin.contant';
// Sub Schema for Name Create
const createAdminNameValidationSchema = z.object({
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
const updateAdminNameValidationSchema = z
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

// Main Schema for Admin Create
const createValidationAdminSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    designation: z.string(),
    name: createAdminNameValidationSchema,
    email: z.string().email({ message: '{VALUE} is not a valid email format' }),
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: createPresentAddressValidationSchema,
    permanentAddress: createPresentAddressValidationSchema,
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
  }),
});

// Main Schema for Admin Update
const updateValidationAdminSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    designation: z.string().optional(),
    name: updateAdminNameValidationSchema.optional(),
    email: z
      .string()
      .email({ message: '{VALUE} is not a valid email format' })
      .optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: updatePresentAddressValidationSchema.optional(),
    permanentAddress: updatePresentAddressValidationSchema.optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  }),
});

export const AdminValidationSchemas = {
  createValidationAdminSchema,
  updateValidationAdminSchema,
};
