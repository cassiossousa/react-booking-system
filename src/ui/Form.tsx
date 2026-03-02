import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;
