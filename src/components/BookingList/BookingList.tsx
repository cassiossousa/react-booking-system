import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllBookings } from '../../features/bookings/selectors';
import {
  deleteBooking,
  setEditingBooking,
} from '../../features/bookings/bookingsSlice';
import { BookingCard } from '../BookingCard/BookingCard';
import EmptyState, { Wrapper } from '../EmptyState/EmptyState';
import type { Booking } from '../../features/bookings/bookings.types';

export const BookingList = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectAllBookings);

  // Stable callbacks (important for performance)
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteBooking(id));
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (booking: Booking) => {
      dispatch(setEditingBooking(booking));
    },
    [dispatch],
  );

  if (bookings.length === 0) {
    return <EmptyState>No bookings yet. Create your first one.</EmptyState>;
  }

  return (
    <Wrapper>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </Wrapper>
  );
};
