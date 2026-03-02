import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './Navbar';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 24px;
`;

export const AppLayout = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};
