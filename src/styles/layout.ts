import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;
