import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    }),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    }),
    phone: z.string({
      required_error: 'phone is required',
      invalid_type_error: 'phone must be a string',
    }),
    role: z.enum(['admin', 'user']),
    address: z.string({
      required_error: 'address is required',
      invalid_type_error: 'address must be a string',
    }),
  }),
});

export const userValidation = {
    createUserValidationSchema
}