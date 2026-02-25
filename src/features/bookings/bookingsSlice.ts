import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Booking } from './domain/booking.types';
import { createBooking } from './domain/booking.service';

interface BookingState {
  items: Booking[];
}

const initialState: BookingState = {
  items: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (
      state,
      action: PayloadAction<Omit<Booking, 'id' | 'createdAt'>>,
    ) => {
      const booking = createBooking(action.payload, state.items);
      state.items.push(booking);
    },

    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);

      if (booking) {
        booking.status = 'cancelled';
      }
    },
  },
});

export const { addBooking, cancelBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
