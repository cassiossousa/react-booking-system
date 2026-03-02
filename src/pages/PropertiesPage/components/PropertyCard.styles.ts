import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Name = styled.div`
  font-weight: 600;
`;

export const Location = styled.div`
  font-weight: 600;
`;

export const Capacity = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
