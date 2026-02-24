import { describe, it, expect } from 'vitest';
import bookingsReducer, {
  addBooking,
  updateBooking,
  deleteBooking,
  selectBooking,
  clearError,
} from './bookingsSlice';
import type { Booking, BookingsState } from './bookings.types';

describe('bookingsSlice', () => {
  const initialState: BookingsState = {
    entities: {},
    ids: [],
    selectedBookingId: null,
    error: null,
  };

  const mockBooking: Booking = {
    id: '1',
    propertyId: 'prop1',
    propertyName: 'Property 1',
    guestName: 'John Doe',
    startDate: '2025-01-01',
    endDate: '2025-01-10',
  };

  const mockBooking2: Booking = {
    id: '2',
    propertyId: 'prop2',
    propertyName: 'Property 2',
    guestName: 'Jane Doe',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
  };

  describe('addBooking', () => {
    it('should add a valid booking', () => {
      const state = bookingsReducer(initialState, addBooking(mockBooking));

      expect(state.entities['1']).toEqual(mockBooking);
      expect(state.ids).toContain('1');
      expect(state.error).toBeNull();
    });

    it('should set error for invalid date range', () => {
      const invalidBooking: Booking = {
        id: '3',
        propertyId: 'prop3',
        propertyName: 'Property 3',
        guestName: 'Invalid',
        startDate: '2025-01-10',
        endDate: '2025-01-01',
      };

      const state = bookingsReducer(initialState, addBooking(invalidBooking));

      expect(state.error).toBe('Invalid date range');
      expect(state.ids).toHaveLength(0);
    });

    it('should set error for overlapping booking', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const overlappingBooking: Booking = {
        id: '2',
        propertyId: 'prop2',
        propertyName: 'Property 2',
        guestName: 'Overlapping',
        startDate: '2025-01-05',
        endDate: '2025-01-15',
      };

      state = bookingsReducer(state, addBooking(overlappingBooking));

      expect(state.error).toBe('Booking overlaps with existing booking');
      expect(state.ids).toHaveLength(1);
    });

    it('should allow overlapping bookings for different properties', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const bookingDifferentProperty: Booking = {
        id: '3',
        propertyId: 'prop3',
        propertyName: 'Property 3',
        guestName: 'Different Property',
        startDate: '2025-01-05',
        endDate: '2025-01-15',
      };

      state = bookingsReducer(state, addBooking(bookingDifferentProperty));

      expect(state.ids).toHaveLength(2);
      expect(state.error).toBeNull();
    });

    it('should add multiple non-overlapping bookings', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, addBooking(mockBooking2));

      expect(state.ids).toHaveLength(2);
      expect(state.entities['1']).toEqual(mockBooking);
      expect(state.entities['2']).toEqual(mockBooking2);
    });

    it('should handle edge case with adjacent dates', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const nonOverlappingBooking: Booking = {
        id: '3',
        propertyId: 'prop3',
        propertyName: 'Property 3',
        guestName: 'Non-overlapping',
        startDate: '2025-01-11',
        endDate: '2025-01-15',
      };

      state = bookingsReducer(state, addBooking(nonOverlappingBooking));

      expect(state.ids).toHaveLength(2);
      expect(state.error).toBeNull();
    });
  });

  describe('updateBooking', () => {
    it('should update existing booking', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const updatedBooking: Booking = {
        id: '1',
        propertyId: 'prop1',
        propertyName: 'Property 1',
        guestName: 'John Doe Updated',
        startDate: '2025-01-01',
        endDate: '2025-01-10',
      };

      state = bookingsReducer(state, updateBooking(updatedBooking));

      expect(state.entities['1']).toEqual(updatedBooking);
      expect(state.error).toBeNull();
    });

    it('should update non-existent booking and store it', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const newBooking: Booking = {
        id: '999',
        propertyId: 'prop3',
        propertyName: 'Property 3',
        guestName: 'Non-existent',
        startDate: '2025-02-01',
        endDate: '2025-02-10',
      };

      state = bookingsReducer(state, updateBooking(newBooking));

      expect(state.entities['999']).toEqual(newBooking);
      expect(state.error).toBeNull();
    });

    it('should set error for invalid date range when updating', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const invalidBooking: Booking = {
        id: '1',
        propertyId: 'prop1',
        propertyName: 'Property 1',
        guestName: 'Invalid',
        startDate: '2025-01-10',
        endDate: '2025-01-01',
      };

      state = bookingsReducer(state, updateBooking(invalidBooking));

      expect(state.error).toBe('Invalid date range');
      expect(state.entities['1']).toEqual(mockBooking);
    });

    it('should set error for overlapping booking when updating', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, addBooking(mockBooking2));

      const conflictingUpdate: Booking = {
        id: '2',
        propertyId: 'prop2',
        propertyName: 'Property 2',
        guestName: 'Jane Doe Updated',
        startDate: '2025-01-05',
        endDate: '2025-01-12',
      };

      state = bookingsReducer(state, updateBooking(conflictingUpdate));

      expect(state.error).toBe('Booking overlaps with existing booking');
      expect(state.entities['2']).toEqual(mockBooking2);
    });

    it('should allow updating same booking without overlap error', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      const sameBookingUpdated: Booking = {
        id: '1',
        propertyId: 'prop1',
        propertyName: 'Property 1',
        guestName: 'Same Booking Updated',
        startDate: '2025-01-01',
        endDate: '2025-01-10',
      };

      state = bookingsReducer(state, updateBooking(sameBookingUpdated));

      expect(state.entities['1']).toEqual(sameBookingUpdated);
      expect(state.error).toBeNull();
    });
  });

  describe('deleteBooking', () => {
    it('should delete booking by id', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, addBooking(mockBooking2));

      state = bookingsReducer(state, deleteBooking('1'));

      expect(state.ids).toHaveLength(1);
      expect(state.ids[0]).toBe('2');
      expect(state.entities['1']).toBeUndefined();
    });

    it('should not fail when deleting non-existent booking', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      state = bookingsReducer(state, deleteBooking('999'));

      expect(state.ids).toHaveLength(1);
    });

    it('should delete from empty list without error', () => {
      const state = bookingsReducer(initialState, deleteBooking('1'));

      expect(state.ids).toHaveLength(0);
    });

    it('should delete all bookings one by one', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, addBooking(mockBooking2));

      state = bookingsReducer(state, deleteBooking('1'));
      expect(state.ids).toHaveLength(1);

      state = bookingsReducer(state, deleteBooking('2'));
      expect(state.ids).toHaveLength(0);
    });
  });

  describe('selectBooking', () => {
    it('should select a booking by id', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));

      state = bookingsReducer(state, selectBooking('1'));

      expect(state.selectedBookingId).toBe('1');
    });

    it('should deselect when passing null', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, selectBooking('1'));

      state = bookingsReducer(state, selectBooking(null));

      expect(state.selectedBookingId).toBeNull();
    });

    it('should replace previous selection', () => {
      let state = bookingsReducer(initialState, addBooking(mockBooking));
      state = bookingsReducer(state, addBooking(mockBooking2));

      state = bookingsReducer(state, selectBooking('1'));
      expect(state.selectedBookingId).toBe('1');

      state = bookingsReducer(state, selectBooking('2'));
      expect(state.selectedBookingId).toBe('2');
    });

    it('should select non-existent booking id', () => {
      const state = bookingsReducer(initialState, selectBooking('999'));

      expect(state.selectedBookingId).toBe('999');
    });
  });

  describe('clearError', () => {
    it('should clear error message', () => {
      const invalidBooking: Booking = {
        id: '1',
        propertyId: 'prop1',
        propertyName: 'Property 1',
        guestName: 'Invalid',
        startDate: '2025-01-10',
        endDate: '2025-01-01',
      };

      let state = bookingsReducer(initialState, addBooking(invalidBooking));
      expect(state.error).not.toBeNull();

      state = bookingsReducer(state, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe('initial state', () => {
    it('should return initial state when called with undefined action', () => {
      const state = bookingsReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
    });
  });
});
