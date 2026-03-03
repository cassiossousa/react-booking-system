import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Booking } from './domain/booking.schema';
import type { Property } from '../properties/domain/property.schema';

const bookingsAdapter = createEntityAdapter<Booking>();

const initialState = bookingsAdapter.getInitialState({
  selectedBookingId: null as string | null,
  loading: false,
  error: null as string | null,
});

/**
 * Utility: date overlap (yyyy-MM-dd safe lexical comparison)
 */
const isDateRangeOverlapping = (
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) => {
  return startA < endB && endA > startB;
};

/**
 * BUSINESS RULE ENFORCEMENT
 */
export const saveBooking = createAsyncThunk<
  Booking,
  Booking,
  { state: RootState; rejectValue: string }
>('bookings/saveBooking', async (booking, { getState, rejectWithValue }) => {
  const state = getState();

  const allBookings = bookingsAdapter
    .getSelectors((s: RootState) => s.bookings)
    .selectAll(state);

  const property = state.properties.entities[booking.propertyId] as
    | Property
    | undefined;

  if (!property) {
    return rejectWithValue('Property not found.');
  }

  const overlapping = allBookings.filter(
    (b) =>
      b.propertyId === booking.propertyId &&
      b.id !== booking.id &&
      isDateRangeOverlapping(
        booking.checkIn,
        booking.checkOut,
        b.checkIn,
        b.checkOut,
      ),
  );

  const totalGuests =
    overlapping.reduce((sum, b) => sum + b.guests, 0) + booking.guests;

  if (totalGuests > property.capacity) {
    return rejectWithValue(
      `This booking exceeds property capacity (${property.capacity}).`,
    );
  }

  return booking;
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    bookingRemoved: bookingsAdapter.removeOne,
    bookingSelected(state, action: PayloadAction<string | null>) {
      state.selectedBookingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.loading = false;
        bookingsAdapter.upsertOne(state, action.payload);
      })
      .addCase(saveBooking.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? 'Failed to save booking. Please try again.';
      });
  },
});

export const { bookingRemoved, bookingSelected } = bookingsSlice.actions;

export default bookingsSlice.reducer;

/**
 * Adapter selectors
 */
export const bookingsSelectors = bookingsAdapter.getSelectors<RootState>(
  (state) => state.bookings,
);
