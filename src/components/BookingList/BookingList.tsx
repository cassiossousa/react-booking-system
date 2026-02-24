import { useAppSelector } from '../../app/hooks';
import { selectAllBookings } from '../../features/bookings/selectors';
import { BookingCard } from '../BookingCard/BookingCard';
import EmptyState from '../EmptyState/EmptyState';
import {
  ListWrapper,
  PropertySection,
  PropertyTitle,
} from './BookingList.styles';

export default function BookingList() {
  const bookings = useAppSelector(selectAllBookings);

  if (!bookings.length) {
    return <EmptyState />;
  }

  const grouped = bookings.reduce(
    (acc, booking) => {
      if (!acc[booking.propertyId]) {
        acc[booking.propertyId] = [];
      }
      acc[booking.propertyId].push(booking);
      return acc;
    },
    {} as Record<string, typeof bookings>,
  );

  return (
    <ListWrapper>
      {Object.entries(grouped).map(([propertyId, bookings]) => (
        <PropertySection key={propertyId}>
          <PropertyTitle>{propertyId}</PropertyTitle>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </PropertySection>
      ))}
    </ListWrapper>
  );
}
