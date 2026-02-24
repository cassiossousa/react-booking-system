import styled from 'styled-components';

interface Props {
  variant?: 'primary' | 'danger' | 'ghost';
}

export const Button = styled.button<Props>`
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'danger':
        return `
          background: ${theme.colors.danger};
          color: white;
        `;
      case 'ghost':
        return `
          background: transparent;
          border: 1px solid ${theme.colors.border};
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
  }
`;
