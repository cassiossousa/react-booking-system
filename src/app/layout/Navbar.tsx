import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  &.active {
    text-decoration: underline;
  }
`;

export const Navbar = () => (
  <Nav>
    <StyledLink to="/">Bookings</StyledLink>
    <StyledLink to="/properties">Properties</StyledLink>
  </Nav>
);
