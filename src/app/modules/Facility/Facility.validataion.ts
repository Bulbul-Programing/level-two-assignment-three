import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    pricePerHour: z.number({
      required_error: 'price per hour is required',
      invalid_type_error: 'price per hour must be a number',
    }),
    location: z.string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    }),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }).optional(),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }).optional(),
    pricePerHour: z.number({
      required_error: 'price per hour is required',
      invalid_type_error: 'price per hour must be a number',
    }).optional(),
    location: z.string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    }).optional(),
  }),
});

export const facilityValidation = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema
}