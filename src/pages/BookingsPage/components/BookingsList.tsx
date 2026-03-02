import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAllBookingsWithProperty } from '../../../features/bookings/bookings.selectors';
import {
  bookingRemoved,
  bookingSelected,
} from '../../../features/bookings/bookings.slice';
import { BookingsCard } from './BookingsCard';
import type { BookingWithProperty } from '../../../features/bookings/domain/booking.schema';
import EmptyState from './EmptyState';

export const BookingsList = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectAllBookingsWithProperty);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(bookingRemoved(id));
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (booking: BookingWithProperty) => {
      dispatch(bookingSelected(booking.id));
    },
    [dispatch],
  );

  if (bookings.length === 0) {
    return <EmptyState>No bookings yet. Create your first one.</EmptyState>;
  }

  return (
    <>
      {bookings.map((booking) => (
        <BookingsCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
};
