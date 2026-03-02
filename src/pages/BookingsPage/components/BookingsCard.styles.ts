import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Property = styled.div`
  font-weight: 600;
`;

export const Guest = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Dates = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
