import BookingForm from '../components/BookingForm/BookingForm';
import BookingList from '../components/BookingList/BookingList';
import { Container } from './BookingPage.styles';

export default function BookingPage() {
  return (
    <Container>
      <h1>Holonic Booking Manager</h1>
      <BookingForm />
      <BookingList />
    </Container>
  );
}
