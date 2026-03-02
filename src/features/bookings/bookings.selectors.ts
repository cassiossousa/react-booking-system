import { createSelector } from '@reduxjs/toolkit';

import { bookingsSelectors } from './bookings.slice';
import { propertiesSelectors } from '../properties/properties.slice';
import type { RootState } from '../../app/store';
import type { BookingWithProperty } from './domain/booking.schema';

export const selectAllBookings = bookingsSelectors.selectAll;
export const selectBookingById = bookingsSelectors.selectById;
export const selectBookingIds = bookingsSelectors.selectIds;
export const selectBookingEntities = bookingsSelectors.selectEntities;

export const selectSelectedBookingId = (state: RootState) =>
  state.bookings.selectedBookingId;

export const selectSelectedBooking = createSelector(
  selectSelectedBookingId,
  selectBookingEntities,
  (selectedId, entities) =>
    selectedId ? (entities[selectedId] ?? null) : null,
);

export const selectAllBookingsWithProperty = createSelector(
  selectAllBookings,
  propertiesSelectors.selectEntities,
  (bookings, properties): BookingWithProperty[] =>
    bookings.map((booking) => ({
      ...booking,
      propertyName: properties[booking.propertyId]?.name ?? 'Unknown',
    })),
);

export const makeSelectBookingWithProperty = (bookingId: string) =>
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
