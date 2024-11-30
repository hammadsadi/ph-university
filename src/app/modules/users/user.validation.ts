import z from 'zod';
const userSchemaWithZod = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password more then 20 Character not Allow' })
    .min(6, { message: 'Password write minium 6 Character' }),
});

export default userSchemaWithZod;
