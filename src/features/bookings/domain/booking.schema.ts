import { z } from 'zod';

export const BookingSchema = z.object({
  id: z.uuid(),
  propertyId: z.uuid(),
  guestName: z.string().min(2),
  checkIn: z.iso.datetime(),
  checkOut: z.iso.datetime(),
  createdAt: z.iso.datetime(),
});

export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  createdAt: true,
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export interface BookingWithProperty extends Booking {
  propertyName: string;
}
