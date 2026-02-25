import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllBookings } from '../../features/bookings/selectors';
import { BookingCard } from '../BookingCard/BookingCard';
import EmptyState, { Wrapper } from '../EmptyState/EmptyState';
import type { Booking } from '../../features/bookings/types';
import { cancelBooking } from '../../features/bookings/bookingsSlice';

export const BookingList = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectAllBookings);

  // Stable callbacks (important for performance)
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(cancelBooking(id));
    },
    [dispatch],
  );

  const handleEdit = useCallback((booking: Booking) => {
    // For simplicity, we'll just log the booking to edit.
    // In a real app, this would open an edit form.
    console.log('Edit booking:', booking);
  }, []);

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
