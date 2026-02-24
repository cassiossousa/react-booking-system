import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteBooking,
  selectBooking,
  clearError,
} from '../../features/bookings/bookingsSlice';
import {
  selectAllBookings,
  selectError,
} from '../../features/bookings/selectors';

import {
  ListWrapper,
  Card,
  ButtonGroup,
  Button,
  ErrorBanner,
} from './BookingList.styles';

export default function BookingList() {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectAllBookings);
  const error = useAppSelector(selectError);

  return (
    <ListWrapper>
      {error && (
        <ErrorBanner>
          {error}
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={() => dispatch(clearError())}
          >
            Dismiss
          </Button>
        </ErrorBanner>
      )}

      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking) => (
        <Card key={booking.id}>
          <div>
            <strong>{booking.guestName}</strong>
            <div>Property: {booking.propertyId}</div>
            <div>
              {booking.startDate.slice(0, 10)} → {booking.endDate.slice(0, 10)}
            </div>
          </div>

          <ButtonGroup>
            <Button onClick={() => dispatch(selectBooking(booking.id))}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(deleteBooking(booking.id))}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card>
      ))}
    </ListWrapper>
  );
}
