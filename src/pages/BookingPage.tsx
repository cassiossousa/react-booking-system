import styled from 'styled-components';
import BookingForm from '../components/BookingForm/BookingForm';
import BookingList from '../components/BookingList/BookingList';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 3rem 1rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export default function BookingPage() {
  return (
    <Page>
      <Container>
        <Header>
          <h1>Booking Manager</h1>
          <p>Manage property reservations with precision.</p>
        </Header>

        <BookingForm />
        <BookingList />
      </Container>
    </Page>
  );
}
