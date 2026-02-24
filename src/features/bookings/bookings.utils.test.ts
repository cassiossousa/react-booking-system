import { describe, it, expect } from 'vitest';
import {
  isDateRangeValid,
  bookingsOverlap,
  hasOverlappingBooking,
} from './bookings.utils';
import type { Booking } from './bookings.types';

describe('isDateRangeValid', () => {
  it('should return true when start date is before end date', () => {
    const result = isDateRangeValid('2025-01-01', '2025-01-02');
    expect(result).toBe(true);
  });

  it('should return false when start date is after end date', () => {
    const result = isDateRangeValid('2025-01-02', '2025-01-01');
    expect(result).toBe(false);
  });

  it('should return false when start date equals end date', () => {
    const result = isDateRangeValid('2025-01-01', '2025-01-01');
    expect(result).toBe(false);
  });

  it('should handle ISO dates with time component', () => {
    const result = isDateRangeValid(
      '2025-01-01T10:00:00',
      '2025-01-01T20:00:00',
    );
    expect(result).toBe(true);
  });

  it('should handle full month difference', () => {
    const result = isDateRangeValid('2025-01-01', '2025-02-01');
    expect(result).toBe(true);
  });

  it('should handle multiple year difference', () => {
    const result = isDateRangeValid('2023-12-31', '2025-01-01');
    expect(result).toBe(true);
  });
});

describe('bookingsOverlap', () => {
  it('should return true when bookings overlap', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-10',
      '2025-01-05',
      '2025-01-15',
    );
    expect(result).toBe(true);
  });

  it('should return false when bookings do not overlap', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-10',
      '2025-01-15',
      '2025-01-20',
    );
    expect(result).toBe(false);
  });

  it('should return false when bookings are adjacent', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-10',
      '2025-01-10',
      '2025-01-15',
    );
    expect(result).toBe(false);
  });

  it('should return true when first booking contains second', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-20',
      '2025-01-05',
      '2025-01-15',
    );
    expect(result).toBe(true);
  });

  it('should return true when second booking contains first', () => {
    const result = bookingsOverlap(
      '2025-01-05',
      '2025-01-15',
      '2025-01-01',
      '2025-01-20',
    );
    expect(result).toBe(true);
  });

  it('should return true when bookings start at same time', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-10',
      '2025-01-01',
      '2025-01-05',
    );
    expect(result).toBe(true);
  });

  it('should return true when bookings end at same time', () => {
    const result = bookingsOverlap(
      '2025-01-01',
      '2025-01-10',
      '2025-01-05',
      '2025-01-10',
    );
    expect(result).toBe(true);
  });

  it('should handle time components', () => {
    const result = bookingsOverlap(
      '2025-01-01T10:00:00',
      '2025-01-01T20:00:00',
      '2025-01-01T15:00:00',
      '2025-01-02T10:00:00',
    );
    expect(result).toBe(true);
  });
});

describe('hasOverlappingBooking', () => {
  const booking1: Booking = {
    id: '1',
    propertyId: 'prop1',
    guestName: 'Guest 1',
    startDate: '2025-01-01',
    endDate: '2025-01-10',
  };

  const booking2: Booking = {
    id: '2',
    propertyId: 'prop1',
    guestName: 'Guest 2',
    startDate: '2025-01-05',
    endDate: '2025-01-15',
  };

  const booking3: Booking = {
    id: '3',
    propertyId: 'prop2',
    guestName: 'Guest 3',
    startDate: '2025-01-01',
    endDate: '2025-01-10',
  };

  it('should return true when new booking overlaps with existing', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop1',
      guestName: 'Guest 4',
      startDate: '2025-01-07',
      endDate: '2025-01-12',
    };

    const result = hasOverlappingBooking([booking1], newBooking);
    expect(result).toBe(true);
  });

  it('should return false when new booking has no overlap', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop1',
      guestName: 'Guest 4',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
    };

    const result = hasOverlappingBooking([booking1], newBooking);
    expect(result).toBe(false);
  });

  it('should ignore different property', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop2',
      guestName: 'Guest 4',
      startDate: '2025-01-05',
      endDate: '2025-01-12',
    };

    const result = hasOverlappingBooking([booking1], newBooking);
    expect(result).toBe(false);
  });

  it('should handle empty booking list', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop1',
      guestName: 'Guest 4',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
    };

    const result = hasOverlappingBooking([], newBooking);
    expect(result).toBe(false);
  });

  it('should exclude booking by ID when updating', () => {
    const updatedBooking: Booking = {
      id: '1',
      propertyId: 'prop1',
      guestName: 'Guest 1 Updated',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
    };

    const result = hasOverlappingBooking(
      [booking1, booking2],
      updatedBooking,
      '1',
    );
    expect(result).toBe(true);
  });

  it('should exclude self when checking for overlap', () => {
    const updatedBooking: Booking = {
      id: '1',
      propertyId: 'prop1',
      guestName: 'Guest 1 Updated',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
    };

    const result = hasOverlappingBooking([booking1], updatedBooking, '1');
    expect(result).toBe(false);
  });

  it('should handle multiple bookings', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop1',
      guestName: 'Guest 4',
      startDate: '2025-01-12',
      endDate: '2025-01-20',
    };

    const result = hasOverlappingBooking(
      [booking1, booking2, booking3],
      newBooking,
    );
    expect(result).toBe(true);
  });

  it('should detect overlap with second booking in list', () => {
    const newBooking: Booking = {
      id: '4',
      propertyId: 'prop1',
      guestName: 'Guest 4',
      startDate: '2025-01-08',
      endDate: '2025-01-12',
    };

    const result = hasOverlappingBooking(
      [booking1, booking2, booking3],
      newBooking,
    );
    expect(result).toBe(true);
  });
});
