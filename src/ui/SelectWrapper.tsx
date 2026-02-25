import styled from 'styled-components';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

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
