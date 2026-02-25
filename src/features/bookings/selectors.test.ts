import { describe, it, expect } from 'vitest';
import {
  selectAllBookings,
  selectBookingById,
  selectActiveBookings,
  selectPastBookings,
  selectOverlappingBookings,
} from './selectors';
import type { Booking } from './bookings.types';

describe('bookings selectors (current)', () => {
  const mockBookings: Booking[] = [
    {
      id: '1',
      propertyId: 'prop1',
      propertyName: 'Property 1',
      guestName: 'Guest 1',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
    },
    {
      id: '2',
      propertyId: 'prop1',
      propertyName: 'Property 1',
      guestName: 'Guest 2',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
    },
    {
      id: '3',
      propertyId: 'prop2',
      propertyName: 'Property 2',
      guestName: 'Guest 3',
      startDate: '2025-02-01',
      endDate: '2025-02-10',
    },
  ];

  const mockState = {
    bookings: {
      items: mockBookings,
      editing: null,
      error: null,
    },
  } as const;

  it('selectAllBookings returns items array', () => {
    const result = selectAllBookings(mockState);
    expect(result).toEqual(mockBookings);
  });

  it('selectBookingById returns specific booking', () => {
    const selector = selectBookingById('2');
    const result = selector(mockState);
    expect(result).toEqual(mockBookings[1]);
  });

  it('selectOverlappingBookings finds overlaps', () => {
    const selector = selectOverlappingBookings('2025-01-05', '2025-01-12');
    const result = selector(mockState);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toBe('1');
  });

  it('selectActiveBookings and selectPastBookings are functions', () => {
    const active = selectActiveBookings(mockState);
    const past = selectPastBookings(mockState);
    expect(Array.isArray(active)).toBe(true);
    expect(Array.isArray(past)).toBe(true);
  });
});
