import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyles';
import { Provider } from 'react-redux';
import { store } from './store';
import { BookingsPage } from '../pages/BookingsPage/BookingsPage';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BookingsPage />
    </ThemeProvider>
  </Provider>
);
