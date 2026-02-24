import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  startDate: string;
  endDate: string;
}

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
