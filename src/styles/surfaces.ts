import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;
