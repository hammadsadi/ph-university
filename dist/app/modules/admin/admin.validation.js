"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidationSchemas = void 0;
const zod_1 = require("zod");
const admin_contant_1 = require("./admin.contant");
// Sub Schema for Name Create
const createAdminNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First Name is Required' })
        .trim()
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: '{VALUE} is not Capitalized Format',
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last Name is Required' })
        .regex(/^[a-zA-Z]+$/, { message: '{VALUE} is not valid' }),
});
// Sub Schema for Name Update
const updateAdminNameValidationSchema = zod_1.z
    .object({
    firstName: zod_1.z
        .string()
        .trim()
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: '{VALUE} is not Capitalized Format',
    })
        .optional(), // Made optional
    middleName: zod_1.z.string().optional(), // Already optional
    lastName: zod_1.z
        .string()
        .regex(/^[a-zA-Z]+$/, { message: '{VALUE} is not valid' })
        .optional(), // Made optional
})
    .optional();
// Sub Schema for Present Address Create
const createPresentAddressValidationSchema = zod_1.z.object({
    street_address: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    postal_code: zod_1.z.string(),
    country: zod_1.z.string(),
});
// Sub Schema for Present Address Update
const updatePresentAddressValidationSchema = zod_1.z
    .object({
    street_address: zod_1.z.string().optional(), // Made optional
    city: zod_1.z.string().optional(), // Made optional
    state: zod_1.z.string().optional(), // Made optional
    postal_code: zod_1.z.string().optional(), // Made optional
    country: zod_1.z.string().optional(), // Made optional
})
    .optional();
// Main Schema for Admin Create
const createValidationAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        designation: zod_1.z.string(),
        name: createAdminNameValidationSchema,
        email: zod_1.z.string().email({ message: '{VALUE} is not a valid email format' }),
        gender: zod_1.z.enum([...admin_contant_1.Gender]),
        dateOfBirth: zod_1.z.string(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string(),
        presentAddress: createPresentAddressValidationSchema,
        permanentAddress: createPresentAddressValidationSchema,
        bloodGroup: zod_1.z.enum([...admin_contant_1.BloodGroup]),
    }),
});
// Main Schema for Admin Update
const updateValidationAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        designation: zod_1.z.string().optional(),
        name: updateAdminNameValidationSchema.optional(),
        email: zod_1.z
            .string()
            .email({ message: '{VALUE} is not a valid email format' })
            .optional(),
        gender: zod_1.z.enum([...admin_contant_1.Gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: updatePresentAddressValidationSchema.optional(),
        permanentAddress: updatePresentAddressValidationSchema.optional(),
        bloodGroup: zod_1.z.enum([...admin_contant_1.BloodGroup]).optional(),
    }),
});
exports.AdminValidationSchemas = {
    createValidationAdminSchema,
    updateValidationAdminSchema,
};
