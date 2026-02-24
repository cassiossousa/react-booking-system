import reducer, {
  addBooking,
  updateBooking,
  deleteBooking,
  setEditingBooking,
  clearError,
  type Booking,
} from './bookingsSlice';
import { describe, it, expect } from 'vitest';

describe('bookingsSlice', () => {
  const baseBooking: Omit<Booking, 'id'> = {
    propertyId: 'p1',
    propertyName: 'Beach House',
    guestName: 'John Doe',
    startDate: '2025-01-01',
    endDate: '2025-01-05',
  };

  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.editing).toBeNull();
    expect(state.error).toBeNull();
  });

  it('adds booking successfully', () => {
    const state = reducer(undefined, addBooking(baseBooking));

    expect(state.items.length).toBe(1);
    expect(state.items[0].guestName).toBe('John Doe');
    expect(state.error).toBeNull();
  });

  it('rejects invalid date range', () => {
    const state = reducer(
      undefined,
      addBooking({
        ...baseBooking,
        startDate: '2025-01-10',
        endDate: '2025-01-05',
      }),
    );

    expect(state.items.length).toBe(0);
    expect(state.error).toBe('End date must be after start date.');
  });

  it('rejects overlapping booking', () => {
    const firstState = reducer(undefined, addBooking(baseBooking));

    const secondState = reducer(
      firstState,
      addBooking({
        ...baseBooking,
        startDate: '2025-01-03',
        endDate: '2025-01-06',
      }),
    );

    expect(secondState.items.length).toBe(1);
    expect(secondState.error).toBe(
      'Booking overlaps with an existing booking for this property.',
    );
  });

  it('updates booking successfully', () => {
    const state1 = reducer(undefined, addBooking(baseBooking));
    const booking = state1.items[0];

    const updated: Booking = {
      ...booking,
      guestName: 'Jane Doe',
      startDate: '2025-01-06',
      endDate: '2025-01-10',
    };

    const state2 = reducer(state1, updateBooking(updated));

    expect(state2.items[0].guestName).toBe('Jane Doe');
    expect(state2.error).toBeNull();
  });

  it('rejects update with invalid date', () => {
    const state1 = reducer(undefined, addBooking(baseBooking));
    const booking = state1.items[0];

    const state2 = reducer(
      state1,
      updateBooking({
        ...booking,
        startDate: '2025-01-10',
        endDate: '2025-01-05',
      }),
    );

    expect(state2.error).toBe('End date must be after start date.');
  });

  it('rejects update with overlapping dates', () => {
    const state1 = reducer(undefined, addBooking(baseBooking));

    const state2 = reducer(
      state1,
      addBooking({
        propertyId: 'p1',
        propertyName: 'Beach House',
        guestName: 'Second Guest',
        startDate: '2025-01-06',
        endDate: '2025-01-10',
      }),
    );

    const firstBooking = state2.items[0];

    const state3 = reducer(
      state2,
      updateBooking({
        ...firstBooking,
        startDate: '2025-01-08',
        endDate: '2025-01-12',
      }),
    );

    expect(state3.error).toBe(
      'Booking overlaps with an existing booking for this property.',
    );
  });

  it('rejects update if booking not found', () => {
    const state = reducer(
      undefined,
      updateBooking({
        id: 'does-not-exist',
        propertyId: 'p1',
        propertyName: 'Beach House',
        guestName: 'Ghost',
        startDate: '2025-01-01',
        endDate: '2025-01-05',
      }),
    );

    expect(state.error).toBe('Booking not found.');
  });

  it('deletes booking', () => {
    const state1 = reducer(undefined, addBooking(baseBooking));
    const bookingId = state1.items[0].id;

    const state2 = reducer(state1, deleteBooking(bookingId));

    expect(state2.items.length).toBe(0);
  });

  it('sets editing booking', () => {
    const state1 = reducer(undefined, addBooking(baseBooking));
    const booking = state1.items[0];

    const state2 = reducer(state1, setEditingBooking(booking));

    expect(state2.editing).toEqual(booking);
  });

  it('clears error', () => {
    const state1 = reducer(
      undefined,
      addBooking({
        ...baseBooking,
        startDate: '2025-01-10',
        endDate: '2025-01-05',
      }),
    );

    expect(state1.error).not.toBeNull();

    const state2 = reducer(state1, clearError());

    expect(state2.error).toBeNull();
  });
});
