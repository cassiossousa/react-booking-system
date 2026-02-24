import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { isDateRangeValid, hasOverlappingBooking } from './bookings.utils';
import type { Booking, BookingsState } from './bookings.types';

const initialState: BookingsState = {
  entities: {},
  ids: [],
  selectedBookingId: null,
  error: null,
  editing: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      const booking = action.payload;
      state.error = null;

      const allBookings = state.ids.map((id) => state.entities[id]);

      if (!isDateRangeValid(booking.startDate, booking.endDate)) {
        state.error = 'Invalid date range';
        return;
      }

      if (hasOverlappingBooking(allBookings, booking)) {
        state.error = 'Booking overlaps with existing booking';
        return;
      }

      state.entities[booking.id] = booking;
      state.ids.push(booking.id);
    },

    updateBooking: (state, action: PayloadAction<Booking>) => {
      const booking = action.payload;
      state.error = null;

      const allBookings = state.ids.map((id) => state.entities[id]);

      if (!isDateRangeValid(booking.startDate, booking.endDate)) {
        state.error = 'Invalid date range';
        return;
      }

      if (hasOverlappingBooking(allBookings, booking, booking.id)) {
        state.error = 'Booking overlaps with existing booking';
        return;
      }

      state.entities[booking.id] = booking;
    },

    deleteBooking: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((existingId) => existingId !== id);
    },

    selectBooking: (state, action: PayloadAction<string | null>) => {
      state.selectedBookingId = action.payload;
    },

    setEditingBooking: (state, action) => {
      state.editing = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addBooking,
  clearError,
  deleteBooking,
  selectBooking,
  setEditingBooking,
  updateBooking,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
