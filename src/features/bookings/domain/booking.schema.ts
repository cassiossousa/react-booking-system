import { z } from 'zod';
import { differenceInDays } from 'date-fns';
import {
  MAX_BOOKING_DURATION_DAYS,
  MIN_BOOKING_DURATION_DAYS,
} from './booking.constants';

export const BookingSchema = z.object({
  id: z.uuid(),
  propertyId: z.uuid(),
  guestName: z.string().min(2, 'Guest name is required'),
  checkIn: z.iso.datetime(),
  checkOut: z.iso.datetime(),
  createdAt: z.iso.datetime(),
});

export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  createdAt: true,
}).superRefine((data, ctx) => {
  const duration = differenceInDays(data.checkOut, data.checkIn);

  if (duration < MIN_BOOKING_DURATION_DAYS) {
    ctx.addIssue({
      code: 'custom',
      message: `Booking must be at least ${MIN_BOOKING_DURATION_DAYS} day${
        MIN_BOOKING_DURATION_DAYS > 1 ? 's' : ''
      }`,
      path: ['checkOut'],
    });
  }

  if (duration > MAX_BOOKING_DURATION_DAYS) {
    ctx.addIssue({
      code: 'custom',
      message: `Booking exceeds maximum duration of ${MAX_BOOKING_DURATION_DAYS} day${
        MAX_BOOKING_DURATION_DAYS > 1 ? 's' : ''
      }`,
      path: ['checkOut'],
    });
  }
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export interface BookingWithProperty extends Booking {
  propertyName: string;
}
