import { selectAllBookings, selectSelectedBooking } from './bookings.selectors';
import type { RootState } from '../../app/store';

const mockState: RootState = {
  bookings: {
    ids: ['1'],
    entities: {
      '1': {
        id: '1',
        propertyId: 'p1',
        guestName: 'John',
        checkIn: '2026-01-01',
        checkOut: '2026-01-02',
      },
    },
    selectedBookingId: '1',
    loading: false,
    error: null,
  },
  properties: {
    ids: [],
    entities: {},
    selectedPropertyId: null,
    loading: false,
    error: null,
  },
};

describe('booking selectors', () => {
  it('selects all bookings', () => {
    const result = selectAllBookings(mockState);
    expect(result).toHaveLength(1);
  });

  it('selects selected booking', () => {
    const result = selectSelectedBooking(mockState);
    expect(result?.id).toBe('1');
  });
});
