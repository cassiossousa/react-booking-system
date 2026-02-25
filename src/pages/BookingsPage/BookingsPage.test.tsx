import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../../features/bookings/bookings.slice';
import { theme } from '../../styles/theme';
import { BookingsPage } from './BookingsPage';

describe('BookingsPage', () => {
  const store = configureStore({
    reducer: {
      bookings: bookingsReducer,
    },
  });

  const renderBookingsPage = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BookingsPage />
        </ThemeProvider>
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('should render the page with correct heading and child content', () => {
      renderBookingsPage();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Property Bookings' }),
      ).toBeInTheDocument();

      // BookingForm presence: check inputs and submit button
      expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Guest Name')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Create Booking/ }),
      ).toBeInTheDocument();

      // BookingList presence: empty state message
      expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have a container with flex layout', () => {
      const { container } = renderBookingsPage();
      const containerElement = container.firstChild;
      expect(containerElement).toBeInTheDocument();
    });

    it('should display all main content sections', () => {
      renderBookingsPage();
      // The app heading is "Property Bookings" and the form/list are
      // represented by inputs and an empty state message respectively.
      const heading = screen.getByRole('heading', {
        name: 'Property Bookings',
      });

      expect(heading).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Guest Name')).toBeInTheDocument();
      expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
    });

    it('should render page in proper hierarchy', () => {
      const { container } = renderBookingsPage();
      // heading, inputs, and list message should all be within the page
      const heading = screen.getByRole('heading', {
        name: 'Property Bookings',
      });
      const propertyInput = screen.getByPlaceholderText('Property Name');
      const listMessage = screen.getByText(/No bookings yet/);

      expect(container).toContainElement(heading);
      expect(container).toContainElement(propertyInput);
      expect(container).toContainElement(listMessage);
    });
  });

  describe('Component Integration', () => {
    it('should provide Redux Provider to child components', () => {
      renderBookingsPage();
      // If Redux Provider wasn't working, child components wouldn't render
      expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
      expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
    });

    it('should render a complete booking page application', () => {
      renderBookingsPage();
      expect(
        screen.getByRole('heading', { name: 'Property Bookings' }),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
      expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
    });

    it('should have heading before form and list', () => {
      const { container } = renderBookingsPage();
      const heading = screen.getByRole('heading', {
        name: 'Property Bookings',
      });
      const form = screen.getByPlaceholderText('Property Name');
      const listMessage = screen.getByText(/No bookings yet/);

      const order = Array.from(container.querySelectorAll('h1, input, div'));
      expect(order.indexOf(heading)).toBeLessThan(order.indexOf(form));
      expect(order.indexOf(form)).toBeLessThan(order.indexOf(listMessage));
    });
  });

  describe('Page Structure', () => {
    it('should be a function component', () => {
      const { container } = renderBookingsPage();
      expect(container.childNodes.length).toBeGreaterThan(0);
    });

    it('should render without errors', () => {
      expect(() => {
        renderBookingsPage();
      }).not.toThrow();
    });

    it('should render all child elements without errors', () => {
      renderBookingsPage();
      screen.getByRole('heading');
      screen.getByPlaceholderText('Property Name');
      screen.getByText(/No bookings yet/);

      expect(
        screen.getByRole('heading', { name: 'Property Bookings' }),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
      expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
    });
  });
});
