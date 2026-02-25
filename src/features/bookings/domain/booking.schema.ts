import { z } from 'zod';
import { parseISO, isBefore } from 'date-fns';

export const bookingSchema = z
  .object({
    propertyId: z.string().min(1, 'Property is required'),
    guestName: z.string().min(2, 'Guest name must be at least 2 characters'),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine(
    (data) => {
      const start = parseISO(data.startDate);
      const end = parseISO(data.endDate);
      return isBefore(start, end);
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    },
  );

export type BookingFormValues = z.infer<typeof bookingSchema>;
