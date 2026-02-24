import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 240px;
`;
