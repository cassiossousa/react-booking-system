import type { BookingWithProperty } from '../../../features/bookings/domain/booking.schema';
import { EditableCard } from '../../../ui/EditableCard';
import { format } from 'date-fns';
import styled from 'styled-components';

interface Props {
  booking: BookingWithProperty;
  disableActions: boolean;
  isEditing: boolean;
  onDelete: (id: string) => void;
  onEdit: (booking: BookingWithProperty) => void;
}

export const BookingCard = ({
  booking,
  disableActions,
  isEditing,
  onDelete,
  onEdit,
}: Props) => {
  const formattedCheckIn = format(new Date(booking.checkIn), 'dd/MM/yyyy');
  const formattedCheckOut = format(new Date(booking.checkOut), 'dd/MM/yyyy');

  return (
    <EditableCard
      title={booking.propertyName}
      subtitle={`${booking.guests} guest${booking.guests === 1 ? '' : 's'}`}
      body={
        <Dates>
          <span>Check-in: {formattedCheckIn}</span>
          <span>Check-out: {formattedCheckOut}</span>
        </Dates>
      }
      isEditing={isEditing}
      disableActions={disableActions}
      onEdit={() => onEdit(booking)}
      onDelete={() => onDelete(booking.id)}
      confirmTitle="Delete Booking"
      confirmDescription="Are you sure you want to delete this booking?"
      data-testid="booking-card"
    />
  );
};

const Dates = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
