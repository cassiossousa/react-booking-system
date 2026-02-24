import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const selectBookingsState = (state: RootState) => state.bookings;

export const selectAllBookings = createSelector(
  [selectBookingsState],
  (bookingsState) => bookingsState.ids.map((id) => bookingsState.entities[id]),
);

export const selectBookingEntities = createSelector(
  [selectBookingsState],
  (state) => state.entities,
);

export const selectSelectedBooking = createSelector(
  [selectBookingsState],
  (state) =>
    state.selectedBookingId ? state.entities[state.selectedBookingId] : null,
);

export const selectError = createSelector(
  [selectBookingsState],
  (state) => state.error,
);
