import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}

const bookingsAdapter = createEntityAdapter<Booking>();

const initialState = bookingsAdapter.getInitialState({
  selectedBookingId: null as string | null,
  loading: false,
  error: null as string | null,
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    bookingAdded: bookingsAdapter.addOne,
    bookingUpdated: bookingsAdapter.upsertOne,
    bookingRemoved: bookingsAdapter.removeOne,

    bookingSelected(state, action: PayloadAction<string | null>) {
      state.selectedBookingId = action.payload;
    },
  },
});

export const { bookingAdded, bookingUpdated, bookingRemoved, bookingSelected } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;

/**
 * Adapter selectors (fully consistent)
 */
export const bookingsSelectors = bookingsAdapter.getSelectors<RootState>(
  (state) => state.bookings,
);
