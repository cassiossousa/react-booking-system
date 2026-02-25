import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllBookingsWithProperty } from '../../features/bookings/selectors';
import {
  bookingRemoved,
  bookingSelected,
} from '../../features/bookings/bookingsSlice';
import { BookingCard } from '../BookingCard/BookingCard';
import EmptyState from '../EmptyState/EmptyState';
import type { BookingWithProperty } from '../../features/bookings/types';

export const BookingList = () => {
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
        <BookingCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
};
