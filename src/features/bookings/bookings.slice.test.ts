import bookingsReducer, {
  bookingAdded,
  bookingRemoved,
  bookingUpdated,
  bookingSelected,
} from './bookings.slice';
import type { Booking } from './types';

const mockBooking: Booking = {
  id: '1',
  propertyId: 'p1',
  guestName: 'John Doe',
  checkIn: '2026-03-01',
  checkOut: '2026-03-05',
};

describe('bookingsSlice', () => {
  it('adds booking', () => {
    const state = bookingsReducer(undefined, bookingAdded(mockBooking));
    expect(state.entities['1']).toEqual(mockBooking);
  });

  it('removes booking', () => {
    const initial = bookingsReducer(undefined, bookingAdded(mockBooking));
    const state = bookingsReducer(initial, bookingRemoved('1'));

    expect(state.entities['1']).toBeUndefined();
  });

  it('updates booking', () => {
    const initial = bookingsReducer(undefined, bookingAdded(mockBooking));

    const updated = {
      ...mockBooking,
      guestName: 'Jane Doe',
    };

    const state = bookingsReducer(initial, bookingUpdated(updated));

    expect(state.entities['1']?.guestName).toBe('Jane Doe');
  });

  it('selects booking', () => {
    const state = bookingsReducer(undefined, bookingSelected('1'));
    expect(state.selectedBookingId).toBe('1');
  });
});
