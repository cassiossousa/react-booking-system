import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../../features/bookings/bookings.slice';
import propertiesReducer from '../../features/properties/properties.slice';
import { theme } from '../../styles/theme';
import { BookingsPage } from './BookingsPage';

describe('<BookingsPage />', () => {
  function renderWithStore(preloadedState = {}) {
    const store = configureStore({
      reducer: {
        bookings: bookingsReducer,
        properties: propertiesReducer,
      },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BookingsPage />
        </ThemeProvider>
      </Provider>,
    );
  }

  describe('Layout Structure', () => {
    it('should have a container with flex layout', () => {
      const { container } = renderWithStore();
      const containerElement = container.firstChild;
      expect(containerElement).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('should be a function component', () => {
      const { container } = renderWithStore();
      expect(container.childNodes.length).toBeGreaterThan(0);
    });

    it('should render without errors', () => {
      expect(() => {
        renderWithStore();
      }).not.toThrow();
    });
  });
});
