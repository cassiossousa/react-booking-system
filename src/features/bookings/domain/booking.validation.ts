import {
  MIN_BOOKING_DURATION_DAYS,
  MAX_BOOKING_DURATION_DAYS,
} from './booking.constants';
import { differenceInDays, isOverlapping } from './date.utils';
import { BookingValidationError, BookingConflictError } from './booking.errors';
import type { Booking } from './booking.types';

export const validateBookingInput = (
  input: Omit<Booking, 'id' | 'createdAt'>,
) => {
  if (!input.customerName.trim()) {
    throw new BookingValidationError('Customer name is required');
  }

  const duration = differenceInDays(input.startDate, input.endDate);

  if (duration < MIN_BOOKING_DURATION_DAYS) {
    throw new BookingValidationError('Booking must be at least 1 day');
  }

  if (duration > MAX_BOOKING_DURATION_DAYS) {
    throw new BookingValidationError('Booking exceeds maximum duration');
  }
};

export const ensureNoConflict = (
  newBooking: Omit<Booking, 'id' | 'createdAt'>,
  existing: Booking[],
) => {
  const conflict = existing.some((b) =>
    isOverlapping(
      newBooking.startDate,
      newBooking.endDate,
      b.startDate,
      b.endDate,
    ),
  );

  if (conflict) {
    throw new BookingConflictError(
      'Booking dates conflict with existing booking',
    );
  }
};
