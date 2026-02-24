import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-weight: 600;
  }

  button, input, select {
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;
