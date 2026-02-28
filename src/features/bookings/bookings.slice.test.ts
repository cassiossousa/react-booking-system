import reducer, {
  bookingAdded,
  bookingUpdated,
  bookingRemoved,
  bookingSelected,
  bookingsSelectors,
  type Booking,
} from './bookings.slice';

describe('bookings slice - full coverage', () => {
  const baseBooking: Booking = {
    id: '1',
    propertyId: 'p1',
    guestName: 'John Doe',
    checkIn: '2026-01-01',
    checkOut: '2026-01-05',
  };

  const secondBooking: Booking = {
    id: '2',
    propertyId: 'p2',
    guestName: 'Alice',
    checkIn: '2026-02-01',
    checkOut: '2026-02-03',
  };

  /* ------------------ INITIAL STATE ------------------ */

  it('should return the initial state when passed unknown action', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      ids: [],
      entities: {},
      selectedBookingId: null,
      loading: false,
      error: null,
    });
  });

  /* ------------------ ADD ------------------ */

  it('should add one booking', () => {
    const state = reducer(undefined, bookingAdded(baseBooking));

    expect(state.ids).toEqual(['1']);
    expect(state.entities['1']).toEqual(baseBooking);
  });

  it('should add multiple bookings', () => {
    let state = reducer(undefined, bookingAdded(baseBooking));
    state = reducer(state, bookingAdded(secondBooking));

    expect(state.ids).toHaveLength(2);
    expect(state.entities['2']).toEqual(secondBooking);
  });

  /* ------------------ UPDATE ------------------ */

  it('should update existing booking', () => {
    let state = reducer(undefined, bookingAdded(baseBooking));

    state = reducer(
      state,
      bookingUpdated({
        ...baseBooking,
        guestName: 'Updated Name',
      }),
    );

    expect(state.entities['1']?.guestName).toBe('Updated Name');
  });

  it('should upsert booking if it does not exist', () => {
    const state = reducer(undefined, bookingUpdated(baseBooking));

    expect(state.ids).toContain('1');
    expect(state.entities['1']).toEqual(baseBooking);
  });

  /* ------------------ REMOVE ------------------ */

  it('should remove existing booking', () => {
    let state = reducer(undefined, bookingAdded(baseBooking));

    state = reducer(state, bookingRemoved('1'));

    expect(state.ids).toEqual([]);
    expect(state.entities['1']).toBeUndefined();
  });

  it('should do nothing when removing non-existent booking', () => {
    const state = reducer(undefined, bookingRemoved('999'));

    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
  });

  /* ------------------ SELECT ------------------ */

  it('should set selectedBookingId', () => {
    const state = reducer(undefined, bookingSelected('1'));

    expect(state.selectedBookingId).toBe('1');
  });

  it('should clear selectedBookingId', () => {
    let state = reducer(undefined, bookingSelected('1'));
    state = reducer(state, bookingSelected(null));

    expect(state.selectedBookingId).toBeNull();
  });

  /* ------------------ SELECTORS ------------------ */

  describe('bookingsSelectors', () => {
    const populatedState = {
      bookings: {
        ids: ['1', '2'],
        entities: {
          '1': baseBooking,
          '2': secondBooking,
        },
        selectedBookingId: null,
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

    it('selectAll should return all bookings', () => {
      const result = bookingsSelectors.selectAll(populatedState);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });

    it('selectById should return correct booking', () => {
      const result = bookingsSelectors.selectById(populatedState, '1');

      expect(result).toEqual(baseBooking);
    });

    it('selectById should return undefined if not found', () => {
      const result = bookingsSelectors.selectById(populatedState, '999');

      expect(result).toBeUndefined();
    });

    it('selectIds should return all ids', () => {
      const result = bookingsSelectors.selectIds(populatedState);

      expect(result).toEqual(['1', '2']);
    });

    it('selectEntities should return entities map', () => {
      const result = bookingsSelectors.selectEntities(populatedState);

      expect(result).toEqual({
        '1': baseBooking,
        '2': secondBooking,
      });
    });

    it('selectTotal should return total count', () => {
      const result = bookingsSelectors.selectTotal(populatedState);

      expect(result).toBe(2);
    });
  });
});
