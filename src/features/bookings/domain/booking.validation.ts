import {
  MIN_BOOKING_DURATION_DAYS,
  MAX_BOOKING_DURATION_DAYS,
} from './booking.constants';

import { differenceInDays, isOverlapping } from './date.utils';
import { BookingValidationError, BookingConflictError } from './booking.errors';
import type { Booking, CreateBookingInput } from './booking.schema';

export const validateBookingInput = (input: CreateBookingInput) => {
  if (!input.guestName.trim()) {
    throw new BookingValidationError('Customer name is required');
  }

  const duration = differenceInDays(input.checkIn, input.checkOut);

  if (duration < MIN_BOOKING_DURATION_DAYS) {
    throw new BookingValidationError('Booking must be at least 1 day');
  }

  if (duration > MAX_BOOKING_DURATION_DAYS) {
    throw new BookingValidationError('Booking exceeds maximum duration');
  }
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
