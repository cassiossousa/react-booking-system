import { BookingForm } from '../../components/BookingForm/BookingForm';
import BookingList from '../../components/BookingList/BookingList';
import {
  PageContainer,
  Title,
  Row,
  Column,
  Card,
} from '../../styles/primitives';

export const BookingsPage = () => {
  return (
    <PageContainer>
      <Title>Property Bookings</Title>

      <Row>
        <Column>
          <Card>
            <BookingForm />
          </Card>
        </Column>

        <Column>
          <BookingList />
        </Column>
      </Row>
    </PageContainer>
  );
};
