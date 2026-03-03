import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'danger' | 'ghost';

interface Props {
  $variant?: ButtonVariant;
}

export const Button = styled.button<Props>`
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: white;
        `;
      case 'ghost':
        return css`
          background: transparent;
          border: 1px solid ${theme.colors.border};
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: white;
        `;
    }
  }}

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
