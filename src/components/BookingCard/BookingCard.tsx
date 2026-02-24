import type { Booking } from '../../features/bookings/bookings.types';
import { Button } from '../../ui/Button';
import {
  Actions,
  Card,
  Dates,
  Guest,
  Header,
  Property,
} from './BookingCard.styles';

interface Props {
  booking: Booking;
  onDelete: (id: string) => void;
  onEdit: (booking: Booking) => void;
}

export const BookingCard = ({ booking, onDelete, onEdit }: Props) => {
  return (
    <Card>
      <Header>
        <Property>{booking.propertyName}</Property>
        <Guest>{booking.guestName}</Guest>
      </Header>

      <Dates>
        {booking.startDate} → {booking.endDate}
      </Dates>

      <Actions>
        <Button variant="ghost" onClick={() => onEdit(booking)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(booking.id)}>
          Delete
        </Button>
      </Actions>
    </Card>
  );
};
