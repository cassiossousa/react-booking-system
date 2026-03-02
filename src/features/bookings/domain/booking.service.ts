import { v4 as uuid } from 'uuid';
import type { Booking, CreateBookingInput } from './booking.schema';

export const createBooking = (input: CreateBookingInput): Booking => {
  return {
    ...input,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };
};
