import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { isValidDateRange, hasDateConflict } from './domain/date.utils';

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

interface BookingState {
  items: Booking[];
  editing: Booking | null;
  error: string | null;
}

const initialState: BookingState = {
  items: [],
  editing: null,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<Omit<Booking, 'id'>>) {
      const { propertyId, startDate, endDate } = action.payload;

      // 1️⃣ Validate date range
      if (!isValidDateRange(startDate, endDate)) {
        state.error = 'End date must be after start date.';
        return;
      }

      // 2️⃣ Prevent overlapping bookings
      if (hasDateConflict(startDate, endDate, propertyId, state.items)) {
        state.error =
          'Booking overlaps with an existing booking for this property.';
        return;
      }

      // 3️⃣ Add booking
      state.items.push({
        id: uuid(),
        ...action.payload,
      });

      state.error = null;
    },

    updateBooking(state, action: PayloadAction<Booking>) {
      const { id, propertyId, startDate, endDate } = action.payload;

      // 1️⃣ Validate date range
      if (!isValidDateRange(startDate, endDate)) {
        state.error = 'End date must be after start date.';
        return;
      }

      // 2️⃣ Prevent overlapping (ignore itself)
      if (hasDateConflict(startDate, endDate, propertyId, state.items, id)) {
        state.error =
          'Booking overlaps with an existing booking for this property.';
        return;
      }

      const index = state.items.findIndex((b) => b.id === id);

      if (index === -1) {
        state.error = 'Booking not found.';
        return;
      }

      state.items[index] = action.payload;
      state.editing = null;
      state.error = null;
    },

    deleteBooking(state, action: PayloadAction<string>) {
      state.items = state.items.filter((b) => b.id !== action.payload);
      state.error = null;
    },

    setEditingBooking(state, action: PayloadAction<Booking | null>) {
      state.editing = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  addBooking,
  updateBooking,
  deleteBooking,
  setEditingBooking,
  clearError,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
