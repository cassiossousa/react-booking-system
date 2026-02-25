import { v4 as uuid } from 'uuid';
import { validateBookingInput, ensureNoConflict } from './booking.validation';
import type { Booking } from '../types';

export const createBooking = (
  input: Omit<Booking, 'id' | 'createdAt'>,
  existing: Booking[],
): Booking => {
  // Domain validation
  validateBookingInput(input);

  // Conflict prevention
  ensureNoConflict(input, existing);

  // Construct valid domain entity
  return {
    ...input,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };
};
