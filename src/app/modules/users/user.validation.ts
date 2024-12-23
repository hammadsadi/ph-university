import z from 'zod';
import { user_status } from './user.constant';
const userSchemaWithZod = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password more then 20 Character not Allow' })
    .min(6, { message: 'Password write minium 6 Character' }),
});

// User Status Change Validation Schemas
const userStatusChangeValidationSchema = z.object({
  body: z.object({
    status: z.enum([...user_status] as [string, ...string[]]),
  }),
});
export const UserValidationSchemas = {
  userSchemaWithZod,
  userStatusChangeValidationSchema,
};
