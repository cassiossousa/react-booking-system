import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;
