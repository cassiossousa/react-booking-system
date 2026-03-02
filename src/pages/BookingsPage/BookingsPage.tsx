import { BookingsForm } from './components/BookingsForm';
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
            <BookingsForm />
          </Card>
        </Column>
        <Column>
          <BookingsList />
        </Column>
      </Row>
    </PageContainer>
  );
};
