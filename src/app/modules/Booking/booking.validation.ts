import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const dateStringSchema = z.string().refine(
  (date) => {
    const regex = /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/; // YYYY-MM-DD format
    if (!regex.test(date)) {
      return false;
    }
    const [year, month, day] = date.split('-').map(Number);
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    if (month === 2) {
      if (isLeapYear) {
        return day <= 29;
      } else {
        return day <= 28;
      }
    }

    if ([4, 6, 9, 11].includes(month)) {
      return day <= 30;
    }

    return day <= 31;
  },
  {
    message: 'Invalid date format, expected "YYYY-MM-DD"',
  },
);

const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({
      required_error: 'facility is required',
      invalid_type_error: 'facility must be a string',
    }),
    date:dateStringSchema,
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    user: z
      .string({
        invalid_type_error: 'end Time must be a string',
      })
      .optional(),
    isBooked: z.enum(['confirmed', 'canceled']).optional(),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
