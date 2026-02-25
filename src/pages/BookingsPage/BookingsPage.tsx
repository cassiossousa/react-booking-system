import { BookingForm } from '../../components/BookingForm/BookingForm';
import { BookingList } from '../../components/BookingList/BookingList';
import { PageContainer, Title, Row, Column } from '../../styles/primitives';
import { Card } from '../../ui/Card';

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
