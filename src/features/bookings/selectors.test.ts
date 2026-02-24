import { describe, it, expect } from 'vitest';
import {
  selectAllBookings,
  selectSelectedBooking,
  selectBookingEntities,
  selectError,
} from './selectors';
import type { RootState } from '../../app/store';
import type { Booking } from './bookings.types';

describe('bookings selectors', () => {
  const mockBookings: Booking[] = [
    {
      id: '1',
      propertyId: 'prop1',
      guestName: 'Guest 1',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
    },
    {
      id: '2',
      propertyId: 'prop1',
      guestName: 'Guest 2',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
    },
    {
      id: '3',
      propertyId: 'prop2',
      guestName: 'Guest 3',
      startDate: '2025-02-01',
      endDate: '2025-02-10',
    },
  ];

  const entities: Record<string, Booking> = {
    '1': mockBookings[0],
    '2': mockBookings[1],
    '3': mockBookings[2],
  };

  const mockState: RootState = {
    bookings: {
      entities,
      ids: ['1', '2', '3'],
      selectedBookingId: '1',
      error: null,
    },
  };

  describe('selectAllBookings', () => {
    it('should return all bookings', () => {
      const result = selectAllBookings(mockState);

      expect(result).toEqual(mockBookings);
      expect(result).toHaveLength(3);
    });

    it('should return empty array when no bookings', () => {
      const emptyState: RootState = {
        bookings: {
          entities: {},
          ids: [],
          selectedBookingId: null,
          error: null,
        },
      };

      const result = selectAllBookings(emptyState);

      expect(result).toEqual([]);
    });

    it('should return the actual bookings in order', () => {
      const result = selectAllBookings(mockState);

      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
      expect(result[2].id).toBe('3');
    });
  });

  describe('selectSelectedBooking', () => {
    it('should return selected booking when it exists', () => {
      const result = selectSelectedBooking(mockState);

      expect(result).toEqual(mockBookings[0]);
      expect(result?.id).toBe('1');
    });

    it('should return undefined when selected booking not found', () => {
      const stateWithInvalidSelection: RootState = {
        bookings: {
          entities,
          ids: ['1', '2', '3'],
          selectedBookingId: '999',
          error: null,
        },
      };

      const result = selectSelectedBooking(stateWithInvalidSelection);

      expect(result).toBeUndefined();
    });

    it('should return null when no booking is selected', () => {
      const stateWithNoSelection: RootState = {
        bookings: {
          entities,
          ids: ['1', '2', '3'],
          selectedBookingId: null,
          error: null,
        },
      };

      const result = selectSelectedBooking(stateWithNoSelection);

      expect(result).toBeNull();
    });

    it('should return undefined when bookings list is empty', () => {
      const emptyState: RootState = {
        bookings: {
          entities: {},
          ids: [],
          selectedBookingId: '1',
          error: null,
        },
      };

      const result = selectSelectedBooking(emptyState);

      expect(result).toBeUndefined();
    });

    it('should return correct booking when multiple are selected', () => {
      const stateWithDifferentSelection: RootState = {
        bookings: {
          entities,
          ids: ['1', '2', '3'],
          selectedBookingId: '3',
          error: null,
        },
      };

      const result = selectSelectedBooking(stateWithDifferentSelection);

      expect(result).toEqual(mockBookings[2]);
      expect(result?.propertyId).toBe('prop2');
    });
  });

  describe('selectBookingEntities', () => {
    it('should return booking entities', () => {
      const result = selectBookingEntities(mockState);

      expect(result).toEqual(entities);
    });

    it('should return empty object when no entities', () => {
      const emptyState: RootState = {
        bookings: {
          entities: {},
          ids: [],
          selectedBookingId: null,
          error: null,
        },
      };

      const result = selectBookingEntities(emptyState);

      expect(result).toEqual({});
    });

    it('should return all entities as object', () => {
      const result = selectBookingEntities(mockState);

      expect(result['1']).toEqual(mockBookings[0]);
      expect(result['2']).toEqual(mockBookings[1]);
      expect(result['3']).toEqual(mockBookings[2]);
    });
  });

  describe('selectError', () => {
    it('should return error message', () => {
      const stateWithError: RootState = {
        bookings: {
          entities,
          ids: ['1', '2', '3'],
          selectedBookingId: '1',
          error: 'Booking overlaps with existing booking',
        },
      };

      const result = selectError(stateWithError);

      expect(result).toBe('Booking overlaps with existing booking');
    });

    it('should return null when no error', () => {
      const result = selectError(mockState);

      expect(result).toBeNull();
    });

    it('should return error in empty state', () => {
      const emptyStateWithError: RootState = {
        bookings: {
          entities: {},
          ids: [],
          selectedBookingId: null,
          error: 'Invalid date range',
        },
      };

      const result = selectError(emptyStateWithError);

      expect(result).toBe('Invalid date range');
    });
  });
});
