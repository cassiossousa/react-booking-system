// ui/card.ts
import styled, { css } from 'styled-components';

type CardProps = {
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
};

export const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  ${({ theme, padding = 'md' }) => {
    const map = {
      sm: theme.spacing(3),
      md: theme.spacing(4),
      lg: theme.spacing(5),
    };
    return css`
      padding: ${map[padding]};
    `;
  }}

  ${({ hover, theme }) =>
    hover &&
    css`
      transition: box-shadow 0.2s ease;
      &:hover {
        box-shadow: ${theme.shadow.md};
      }
    `}
`;
