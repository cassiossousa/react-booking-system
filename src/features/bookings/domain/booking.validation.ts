import { isOverlapping } from './date.utils';
import { BookingValidationError, BookingConflictError } from './booking.errors';
import {
  CreateBookingSchema,
  type Booking,
  type CreateBookingInput,
} from './booking.schema';

export const validateBookingInput = (
  input: CreateBookingInput,
): CreateBookingInput => {
  const result = CreateBookingSchema.safeParse(input);

  if (!result.success) {
    // Return first domain error message
    const message = result.error.issues[0]?.message ?? 'Invalid booking data';
    throw new BookingValidationError(message);
  }

  return result.data;
};

export const ensureNoConflict = (
  newBooking: CreateBookingInput,
  existing: Booking[],
) => {
  const conflict = existing.some((b) =>
    isOverlapping(
      newBooking.checkIn,
      newBooking.checkOut,
      b.checkIn,
      b.checkOut,
    ),
  );

  if (conflict) {
    throw new BookingConflictError(
      'Booking dates conflict with existing booking',
    );
  }
};
