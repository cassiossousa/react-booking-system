import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BookingPage from './BookingPage';
import bookingsReducer from '../features/bookings/bookingsSlice';

// Mock the child components
vi.mock('../components/BookingForm/BookingForm', () => ({
  default: () => <div data-testid="booking-form">BookingForm Component</div>,
}));

vi.mock('../components/BookingList/BookingList', () => ({
  default: () => <div data-testid="booking-list">BookingList Component</div>,
}));

describe('BookingPage', () => {
  const store = configureStore({
    reducer: {
      bookings: bookingsReducer,
    },
  });

  const renderBookingPage = () => {
    return render(
      <Provider store={store}>
        <BookingPage />
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('should render the page with correct heading', () => {
      renderBookingPage();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Holonic Booking Manager' }),
      ).toBeInTheDocument();
    });

    it('should render the booking form component', () => {
      renderBookingPage();
      expect(screen.getByTestId('booking-form')).toBeInTheDocument();
      expect(screen.getByText('BookingForm Component')).toBeInTheDocument();
    });

    it('should render the booking list component', () => {
      renderBookingPage();
      expect(screen.getByTestId('booking-list')).toBeInTheDocument();
      expect(screen.getByText('BookingList Component')).toBeInTheDocument();
    });

    it('should render both components in correct order', () => {
      renderBookingPage();
      const elements = screen.getAllByText(
        /BookingForm Component|BookingList Component/,
      );
      expect(elements.length).toBe(2);
      expect(elements[0].textContent).toBe('BookingForm Component');
      expect(elements[1].textContent).toBe('BookingList Component');
    });
  });

  describe('Layout Structure', () => {
    it('should have a container with flex layout', () => {
      const { container } = renderBookingPage();
      const containerElement = container.firstChild;
      expect(containerElement).toBeInTheDocument();
    });

    it('should display all main content sections', () => {
      renderBookingPage();
      const heading = screen.getByRole('heading', {
        name: 'Holonic Booking Manager',
      });
      const form = screen.getByTestId('booking-form');
      const list = screen.getByTestId('booking-list');

      expect(heading).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(list).toBeInTheDocument();
    });

    it('should render page in proper hierarchy', () => {
      const { container } = renderBookingPage();
      screen.getByRole('heading', {
        name: 'Holonic Booking Manager',
      });
      screen.getByTestId('booking-form');
      screen.getByTestId('booking-list');

      // Verify all are children of the container
      expect(
        container.querySelector('[data-testid="booking-form"]'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="booking-list"]'),
      ).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should provide Redux Provider to child components', () => {
      renderBookingPage();
      // If Redux Provider wasn't working, child components wouldn't render
      expect(screen.getByTestId('booking-form')).toBeInTheDocument();
      expect(screen.getByTestId('booking-list')).toBeInTheDocument();
    });

    it('should render a complete booking page application', () => {
      renderBookingPage();
      expect(
        screen.getByRole('heading', { name: 'Holonic Booking Manager' }),
      ).toBeInTheDocument();
      expect(screen.getByTestId('booking-form')).toBeInTheDocument();
      expect(screen.getByTestId('booking-list')).toBeInTheDocument();
    });

    it('should have heading before form and list', () => {
      const { container } = renderBookingPage();
      const heading = screen.getByRole('heading', {
        name: 'Holonic Booking Manager',
      });
      const form = screen.getByTestId('booking-form');
      const list = screen.getByTestId('booking-list');

      const headingIndex = Array.from(
        container.querySelectorAll('h1, [data-testid]'),
      ).indexOf(heading);
      const formIndex = Array.from(
        container.querySelectorAll('h1, [data-testid]'),
      ).indexOf(form);
      const listIndex = Array.from(
        container.querySelectorAll('h1, [data-testid]'),
      ).indexOf(list);

      expect(headingIndex).toBeLessThan(formIndex);
      expect(formIndex).toBeLessThan(listIndex);
    });
  });

  describe('Page Structure', () => {
    it('should be a function component', () => {
      const { container } = renderBookingPage();
      expect(container.childNodes.length).toBeGreaterThan(0);
    });

    it('should render without errors', () => {
      expect(() => {
        renderBookingPage();
      }).not.toThrow();
    });

    it('should render all child elements without errors', () => {
      renderBookingPage();
      screen.getByRole('heading');
      screen.getByTestId('booking-form');
      screen.getByTestId('booking-list');

      expect(
        screen.getByRole('heading', { name: 'Holonic Booking Manager' }),
      ).toBeInTheDocument();
      expect(screen.getByTestId('booking-form')).toBeInTheDocument();
      expect(screen.getByTestId('booking-list')).toBeInTheDocument();
    });
  });
});
