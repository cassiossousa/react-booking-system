import { BookingForm } from './components/BookingForm';
import { BookingsList } from './components/BookingsList';
import { PageContainer, Title, Row, Column } from '../../styles/primitives';
import { Card } from '../../ui/Card';

export const BookingsPage = () => {
  return (
    <PageContainer>
      <Title>Bookings</Title>
      <Row>
        <Column>
          <Card>
            <BookingForm />
          </Card>
        </Column>
        <Column>
          <BookingsList />
        </Column>
      </Row>
    </PageContainer>
  );
};
