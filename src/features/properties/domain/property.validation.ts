import type { Booking } from '../../bookings/domain/booking.schema';
import { isOverlapping } from '../../bookings/domain/date.utils';
import {
  PropertyValidationError,
  PropertyAlreadyExistsError,
} from './property.errors';
import {
  CreatePropertySchema,
  type CreatePropertyInput,
  type Property,
} from './property.schema';

/**
 * Basic schema validation
 */
export const validatePropertyInput = (
  input: CreatePropertyInput,
): CreatePropertyInput => {
  const result = CreatePropertySchema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid property data';
    throw new PropertyValidationError(message);
  }

  return result.data;
};

/**
 * Unique name validation
 */
export const ensureUniquePropertyName = (
  input: CreatePropertyInput,
  existing: Property[],
  currentId?: string,
) => {
  const duplicate = existing.some(
    (p) =>
      p.id !== currentId &&
      p.name.toLowerCase().trim() === input.name.toLowerCase().trim(),
  );

  if (duplicate) {
    throw new PropertyAlreadyExistsError(
      'Property with this name already exists',
    );
  }
};

/**
 * Prevent reducing capacity below what overlapping bookings require
 */
export const validateCapacityReduction = (
  propertyId: string,
  newCapacity: number,
  bookings: Booking[],
) => {
  const propertyBookings = bookings.filter((b) => b.propertyId === propertyId);

  for (const booking of propertyBookings) {
    const overlapping = propertyBookings.filter((b) =>
      isOverlapping(booking.checkIn, booking.checkOut, b.checkIn, b.checkOut),
    );

    const totalGuests = overlapping.reduce((sum, b) => sum + b.guests, 0);

    if (totalGuests > newCapacity) {
      throw new PropertyValidationError(
        `Cannot reduce capacity to ${newCapacity}. Existing overlapping bookings require ${totalGuests}.`,
      );
    }
  }
};
