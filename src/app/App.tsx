import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyles';
import { Provider } from 'react-redux';
import { store } from './store';

import { Routes, Route, HashRouter } from 'react-router-dom';

import { BookingsPage } from '../pages/BookingsPage/BookingsPage';
import { PropertiesPage } from '../pages/PropertiesPage/PropertiesPage';
import { AppLayout } from './layout/AppLayout';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<BookingsPage />} />
            <Route path="properties" element={<PropertiesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </Provider>
);
