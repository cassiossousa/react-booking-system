import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { bookingsSelectors } from './bookingsSlice';
import { propertiesSelectors } from '../properties/propertiesSlice';
import type { BookingWithProperty } from './types';

/**
 * Basic adapter selectors
 */
export const selectAllBookings = bookingsSelectors.selectAll;

export const selectBookingById = bookingsSelectors.selectById;

export const selectBookingIds = bookingsSelectors.selectIds;

export const selectBookingEntities = bookingsSelectors.selectEntities;

/**
 * Selected booking (raw entity)
 */
export const selectSelectedBookingId = (state: RootState) =>
  state.bookings.selectedBookingId;

export const selectSelectedBooking = createSelector(
  selectSelectedBookingId,
  selectBookingEntities,
  (selectedId, entities) =>
    selectedId ? (entities[selectedId] ?? null) : null,
);

/**
 * Enriched selectors (join with properties)
 */
export const selectAllBookingsWithProperty = createSelector(
  selectAllBookings,
  propertiesSelectors.selectEntities,
  (bookings, properties): BookingWithProperty[] =>
    bookings.map((booking) => ({
      ...booking,
      propertyName: properties[booking.propertyId]?.name ?? 'Unknown',
    })),
);

export const selectBookingWithProperty = (bookingId: string) =>
  createSelector(
    (state: RootState) => bookingsSelectors.selectById(state, bookingId),
    propertiesSelectors.selectEntities,
    (booking, properties): BookingWithProperty | null => {
      if (!booking) return null;

      return {
        ...booking,
        propertyName: properties[booking.propertyId]?.name ?? 'Unknown',
      };
    },
  );
