import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAllBookingsWithProperty } from '../../../features/bookings/bookings.selectors';
import {
  bookingRemoved,
  bookingSelected,
} from '../../../features/bookings/bookings.slice';
import { BookingCard } from './BookingCard';
import type { BookingWithProperty } from '../../../features/bookings/domain/booking.schema';
import EmptyState from '../../../ui/EmptyState';
import { Wrapper } from './BookingsList.styles';

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
