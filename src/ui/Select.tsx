import styled from 'styled-components';

interface WrapperProps {
  $hasError?: boolean;
}

export const SelectWrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    width: 100%;
    padding: ${({ theme }) => theme.spacing(1.5)};
    padding-right: ${({ theme }) => theme.spacing(2)};

    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.danger : theme.colors.border};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;

    box-shadow: ${({ theme }) => theme.shadow.sm};
    transition:
      border 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &::after {
    content: '▾';
    position: absolute;
    right: ${({ theme }) => theme.spacing(3)};
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 12px;
  }
`;

export const Select = styled.select``;
