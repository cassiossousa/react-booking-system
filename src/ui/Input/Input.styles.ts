import styled from 'styled-components';

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
