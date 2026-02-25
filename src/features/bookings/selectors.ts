import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { bookingsSelectors } from './bookingsSlice';
import { propertiesSelectors } from '../properties/propertiesSlice';

/**
 * Basic adapter selectors (direct re-exports)
 */
export const selectAllBookings = bookingsSelectors.selectAll;
export const selectBookingById = bookingsSelectors.selectById;
export const selectBookingIds = bookingsSelectors.selectIds;

/**
 * Extra simple selectors
 */
export const selectSelectedBookingId = (state: RootState) =>
  state.bookings.selectedBookingId;

export const selectSelectedBooking = createSelector(
  selectSelectedBookingId,
  bookingsSelectors.selectEntities,
  (selectedId, entities) =>
    selectedId ? (entities[selectedId] ?? null) : null,
);

/**
 * Cross-feature selector (CORRECT & consistent)
 */
export const selectBookingWithProperty = (bookingId: string) =>
  createSelector(
    (state: RootState) => bookingsSelectors.selectById(state, bookingId),
    propertiesSelectors.selectEntities,
    (booking, properties) => {
      if (!booking) return null;

      const property = properties[booking.propertyId];

      return {
        ...booking,
        propertyName: property?.name ?? 'Unknown',
      };
    },
  );
