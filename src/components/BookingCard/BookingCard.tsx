import type { BookingWithProperty } from '../../features/bookings/types';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Actions, Dates, Guest, Header, Property } from './BookingCard.styles';

interface Props {
  booking: BookingWithProperty;
  onDelete: (id: string) => void;
  onEdit: (booking: BookingWithProperty) => void;
}

export const BookingCard = ({ booking, onDelete, onEdit }: Props) => {
  return (
    <Card hover>
      <Header>
        <Property>{booking.propertyName}</Property>
        <Guest>{booking.guestName}</Guest>
      </Header>

      <Dates>
        {booking.checkIn} → {booking.checkOut}
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
