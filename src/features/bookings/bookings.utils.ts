import { parseISO, isBefore } from 'date-fns';
import type { Booking } from './bookings.types';

export function isDateRangeValid(startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return isBefore(start, end);
}

export function bookingsOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) {
  const sA = parseISO(startA);
  const eA = parseISO(endA);
  const sB = parseISO(startB);
  const eB = parseISO(endB);

  return sA < eB && eA > sB;
}

export function hasOverlappingBooking(
  bookings: Booking[],
  newBooking: Booking,
  excludeId?: string,
) {
  return bookings.some((booking) => {
    if (booking.propertyId !== newBooking.propertyId) return false;
    if (excludeId && booking.id === excludeId) return false;

    return bookingsOverlap(
      booking.startDate,
      booking.endDate,
      newBooking.startDate,
      newBooking.endDate,
    );
  });
}
