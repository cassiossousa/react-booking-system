import { v4 as uuid } from 'uuid';
import type { Booking } from './booking.types';
import { validateBookingInput, ensureNoConflict } from './booking.validation';

export const createBooking = (
  input: Omit<Booking, 'id' | 'createdAt'>,
  existing: Booking[],
): Booking => {
  // 1️⃣ Domain validation
  validateBookingInput(input);

  // 2️⃣ Conflict prevention
  ensureNoConflict(input, existing);

  // 3️⃣ Construct valid domain entity
  return {
    ...input,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };
};
