import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Text = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
