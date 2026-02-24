/**
 * Booking Date Rules
 *
 * - Start date is inclusive
 * - End date is exclusive
 *
 * Meaning:
 * A booking from 2025-01-01 → 2025-01-05
 * occupies nights 1,2,3,4
 *
 * Another booking may start on 2025-01-05 (valid).
 */

/**
 * Parse YYYY-MM-DD safely into UTC midnight.
 * Prevents timezone shift bugs.
 */
export const parseISOToUTC = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const isValidDateRange = (start: string, end: string): boolean => {
  if (!start || !end) return false;

  const startDate = parseISOToUTC(start);
  const endDate = parseISOToUTC(end);

  return startDate.getTime() < endDate.getTime();
};

/**
 * Overlap logic:
 *
 * A and B overlap if:
 * A.start < B.end AND B.start < A.end
 */
export const isOverlapping = (
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean => {
  const aStart = parseISOToUTC(startA).getTime();
  const aEnd = parseISOToUTC(endA).getTime();
  const bStart = parseISOToUTC(startB).getTime();
  const bEnd = parseISOToUTC(endB).getTime();

  return aStart < bEnd && bStart < aEnd;
};

export interface BookingDateShape {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
}

export const hasDateConflict = (
  newStart: string,
  newEnd: string,
  propertyId: string,
  existingBookings: BookingDateShape[],
  ignoreId?: string,
): boolean => {
  return existingBookings
    .filter(
      (booking) => booking.propertyId === propertyId && booking.id !== ignoreId,
    )
    .some((booking) =>
      isOverlapping(newStart, newEnd, booking.startDate, booking.endDate),
    );
};
