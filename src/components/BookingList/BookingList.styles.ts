import styled from 'styled-components';

export const ListWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Button = styled.button<{ variant?: 'danger' }>`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  background: ${({ variant }) =>
    variant === 'danger' ? '#dc2626' : '#2563eb'};
`;

export const ErrorBanner = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 0.75rem;
  border-radius: 6px;
`;
