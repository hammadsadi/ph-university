"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchemas = void 0;
const zod_1 = require("zod");
// Sub Schema for Name Create
const createStudentNameValidationSchema = zod_1.z.object({
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
const updateStudentNameValidationSchema = zod_1.z
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
// Sub Schema for Guardian Create
const createGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, { message: 'Father First Name is Required!' }),
    fatherOccupation: zod_1.z
        .string()
        .min(1, { message: 'Father Occupation is Required' }),
    fatherContact: zod_1.z.string().min(1, { message: 'Father Contact is Required' }),
    motherName: zod_1.z.string().min(1, { message: 'Mother Name is Required' }),
    motherOccupation: zod_1.z
        .string()
        .min(1, { message: 'Mother Occupation is Required' }),
    motherContact: zod_1.z.string().min(1, { message: 'Father Contact is Required' }),
});
// Sub Schema for Guardian Update
const updateGuardianValidationSchema = zod_1.z
    .object({
    fatherName: zod_1.z.string().optional(), // Already optional
    fatherOccupation: zod_1.z.string().optional(), // Already optional
    fatherContact: zod_1.z.string().optional(), // Already optional
    motherName: zod_1.z.string().optional(), // Already optional
    motherOccupation: zod_1.z.string().optional(), // Already optional
    motherContact: zod_1.z.string().optional(), // Already optional
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
// Sub Schema for Loca Guardian Create
const createLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Local Guardian Name is Required!' }),
    occupation: zod_1.z
        .string()
        .min(1, { message: 'Local Guardian Occupation is Required!' }),
    contact: zod_1.z
        .string()
        .min(1, { message: 'Local Guardian Contact is Required!' }),
});
// Sub Schema for Loca Guardian Update
const updateLocalGuardianValidationSchema = zod_1.z
    .object({
    name: zod_1.z.string().optional(), // Made optional
    occupation: zod_1.z.string().optional(), // Made optional
    contact: zod_1.z.string().optional(), // Made optional
})
    .optional();
// Main Schema for Student Create
const createValidationStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        student: zod_1.z.object({
            name: createStudentNameValidationSchema,
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not a valid email format' }),
            gender: zod_1.z.enum(['Male', 'Female'], {
                errorMap: () => ({
                    message: 'You Can Select Two Types: Male or Female',
                }),
            }),
            dateOfBirth: zod_1.z.string(),
            admissionSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            presentAddress: createPresentAddressValidationSchema,
            permanentAddress: createPresentAddressValidationSchema,
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            guardian: createGuardianValidationSchema,
            localGuardian: createLocalGuardianValidationSchema,
        }),
    }),
});
const updateValidationStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: updateStudentNameValidationSchema,
            email: zod_1.z
                .string()
                .email({ message: '{VALUE} is not a valid email format' })
                .optional(), // Made optional
            gender: zod_1.z
                .enum(['Male', 'Female'], {
                errorMap: () => ({
                    message: 'You Can Select Two Types: Male or Female',
                }),
            })
                .optional(), // Made optional
            dateOfBirth: zod_1.z.string().optional(), // Made optional
            admissionSemester: zod_1.z.string().optional(), // Made optional
            academicDepartment: zod_1.z.string().optional(), // Made optional
            contactNo: zod_1.z.string().optional(), // Made optional
            emergencyContactNo: zod_1.z.string().optional(), // Made optional
            presentAddress: updatePresentAddressValidationSchema,
            permanentAddress: updatePresentAddressValidationSchema,
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(), // Made optional
            guardian: updateGuardianValidationSchema,
            localGuardian: updateLocalGuardianValidationSchema,
        }),
    }),
});
exports.studentValidationSchemas = {
    createValidationStudentSchema,
    updateValidationStudentSchema,
};
