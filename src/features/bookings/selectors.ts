import { createSelector } from '@reduxjs/toolkit';
import { isPast } from 'date-fns';
import type { RootState } from '../../app/store';
import { isOverlapping } from './domain/date.utils';

/**
 * Base selector
 */
export const selectBookingState = (state: RootState) => state.bookings;

/**
 * All bookings
 */
export const selectAllBookings = createSelector(
  selectBookingState,
  (bookingState) => bookingState.items,
);

/**
 * Booking by ID
 */
export const selectBookingById = (id: string) =>
  createSelector(selectAllBookings, (bookings) =>
    bookings.find((b) => b.id === id),
  );

/**
 * Active bookings (not past)
 */
export const selectActiveBookings = createSelector(
  selectAllBookings,
  (bookings) => bookings.filter((b) => !isPast(b.endDate)),
);

/**
 * Past bookings
 */
export const selectPastBookings = createSelector(
  selectAllBookings,
  (bookings) => bookings.filter((b) => isPast(b.endDate)),
);

/**
 * Overlapping bookings within a given range
 */
export const selectOverlappingBookings = (startDate: string, endDate: string) =>
  createSelector(selectAllBookings, (bookings) =>
    bookings.filter((b) =>
      isOverlapping(startDate, endDate, b.startDate, b.endDate),
    ),
  );
