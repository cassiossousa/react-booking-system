import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  bookingRemoved,
  bookingSelected,
} from '../../../features/bookings/bookings.slice';
import {
  selectAllBookingsWithProperty,
  selectSelectedBooking,
} from '../../../features/bookings/bookings.selectors';

import { BookingCard } from './BookingCard';
import type { BookingWithProperty } from '../../../features/bookings/domain/booking.schema';
import EmptyState from '../../../ui/EmptyState';
import styled from 'styled-components';

export const BookingsList = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectAllBookingsWithProperty);
  const selectedBooking = useAppSelector(selectSelectedBooking);

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
          disableActions={Boolean(selectedBooking)}
          isEditing={selectedBooking?.id === booking.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;
