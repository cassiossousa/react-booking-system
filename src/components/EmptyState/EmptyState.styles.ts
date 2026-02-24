import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
