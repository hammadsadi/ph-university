"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidationSchemas = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
// Sub Schema for Name Create
const createUserNameValidationSchema = zod_1.z.object({
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
const updateStudentNameValidationSchema = zod_1.z.object({
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
});
// Create Presend Address Validation
const createPresendAddressValidation = zod_1.z.object({
    street_address: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    postal_code: zod_1.z.string(),
    country: zod_1.z.string(),
});
// Update Presend Address Validation
const updatePresendAddressValidation = zod_1.z.object({
    street_address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        designation: zod_1.z.string().optional(),
        name: updateStudentNameValidationSchema.optional(),
        gender: zod_1.z.enum([...faculty_constant_1.Gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloogGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]).optional(),
        presentAddress: updatePresendAddressValidation.optional(),
        permanentAddress: updatePresendAddressValidation.optional(),
        academicDepartment: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
// Main Zod Validaion Schema For Create
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        designation: zod_1.z.string(),
        name: createUserNameValidationSchema,
        gender: zod_1.z.enum([...faculty_constant_1.Gender]),
        dateOfBirth: zod_1.z.string(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string(),
        bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]),
        presentAddress: createPresendAddressValidation,
        permanentAddress: createPresendAddressValidation,
        academicDepartment: zod_1.z.string(),
    }),
});
exports.FacultyValidationSchemas = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
