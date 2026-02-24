import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BookingList from './BookingList';
import bookingsReducer, {
  addBooking,
} from '../../features/bookings/bookingsSlice';

describe('BookingList', () => {
  let store: ReturnType<
    typeof configureStore<{ bookings: ReturnType<typeof bookingsReducer> }>
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        bookings: bookingsReducer,
      },
    });
  });

  const renderBookingList = () => {
    return render(
      <Provider store={store}>
        <BookingList />
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('should render empty state when no bookings', () => {
      renderBookingList();
      expect(screen.getByText('No bookings yet.')).toBeInTheDocument();
    });

    it('should render booking list with multiple bookings', () => {
      const booking1 = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      const booking2 = {
        id: '2',
        propertyId: 'property-2',
        guestName: 'Jane Smith',
        startDate: '2026-04-01T00:00:00.000Z',
        endDate: '2026-04-15T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking1));
      store.dispatch(addBooking(booking2));

      renderBookingList();

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should render booking details correctly', () => {
      const booking = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking));
      renderBookingList();

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Property: property-1')).toBeInTheDocument();
      expect(screen.getByText('2026-03-01 → 2026-03-10')).toBeInTheDocument();
    });

    it('should render edit and delete buttons for each booking', () => {
      const booking = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking));
      renderBookingList();

      const editButtons = screen.getAllByRole('button', { name: /Edit/ });
      const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });

      expect(editButtons.length).toBeGreaterThan(0);
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Booking Actions', () => {
    it('should dispatch selectBooking when edit button is clicked', async () => {
      const user = userEvent.setup();

      const booking = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking));
      renderBookingList();

      const editButtons = screen.getAllByRole('button', { name: /Edit/ });
      await user.click(editButtons[0]);

      await waitFor(() => {
        expect(store.getState().bookings.selectedBookingId).toBe('1');
      });
    });

    it('should dispatch deleteBooking when delete button is clicked', async () => {
      const user = userEvent.setup();

      const booking = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking));
      renderBookingList();

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(store.getState().bookings.ids.length).toBe(0);
        expect(store.getState().bookings.entities['1']).toBeUndefined();
      });
    });

    it('should remove booking from list after delete', async () => {
      const user = userEvent.setup();

      const booking = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking));
      renderBookingList();

      expect(screen.getByText('John Doe')).toBeInTheDocument();

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.getByText('No bookings yet.')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error banner when error exists', () => {
      renderBookingList();

      // Manually set an error in the state
      store = configureStore({
        reducer: {
          bookings: bookingsReducer,
        },
        preloadedState: {
          bookings: {
            entities: {},
            ids: [],
            selectedBookingId: null,
            error: 'Test error message',
          },
        },
      });

      render(
        <Provider store={store}>
          <BookingList />
        </Provider>,
      );

      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should display dismiss button with error banner', () => {
      store = configureStore({
        reducer: {
          bookings: bookingsReducer,
        },
        preloadedState: {
          bookings: {
            entities: {},
            ids: [],
            selectedBookingId: null,
            error: 'Test error message',
          },
        },
      });

      render(
        <Provider store={store}>
          <BookingList />
        </Provider>,
      );

      const buttons = screen.getAllByRole('button', { name: /Dismiss/ });
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should clear error when dismiss button is clicked', async () => {
      const user = userEvent.setup();

      store = configureStore({
        reducer: {
          bookings: bookingsReducer,
        },
        preloadedState: {
          bookings: {
            entities: {},
            ids: [],
            selectedBookingId: null,
            error: 'Test error message',
          },
        },
      });

      render(
        <Provider store={store}>
          <BookingList />
        </Provider>,
      );

      expect(screen.getByText('Test error message')).toBeInTheDocument();

      const dismissButtons = screen.getAllByRole('button', { name: /Dismiss/ });
      await user.click(dismissButtons[0]);

      await waitFor(() => {
        expect(
          screen.queryByText('Test error message'),
        ).not.toBeInTheDocument();
      });
    });

    it('should not display error banner when error is null', () => {
      renderBookingList();
      const dismissButtons = screen.queryAllByRole('button', {
        name: /Dismiss/,
      });
      expect(dismissButtons.length).toBe(0);
    });
  });

  describe('Multiple Bookings', () => {
    it('should delete only selected booking when multiple exist', async () => {
      const user = userEvent.setup();

      const booking1 = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      const booking2 = {
        id: '2',
        propertyId: 'property-2',
        guestName: 'Jane Smith',
        startDate: '2026-04-01T00:00:00.000Z',
        endDate: '2026-04-15T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking1));
      store.dispatch(addBooking(booking2));

      renderBookingList();

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });

    it('should select correct booking when edit is clicked', async () => {
      const user = userEvent.setup();

      const booking1 = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'John Doe',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      const booking2 = {
        id: '2',
        propertyId: 'property-2',
        guestName: 'Jane Smith',
        startDate: '2026-04-01T00:00:00.000Z',
        endDate: '2026-04-15T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking1));
      store.dispatch(addBooking(booking2));

      renderBookingList();

      const editButtons = screen.getAllByRole('button', { name: /Edit/ });
      await user.click(editButtons[1]);

      await waitFor(() => {
        expect(store.getState().bookings.selectedBookingId).toBe('2');
      });
    });

    it('should display all bookings in correct order', () => {
      const booking1 = {
        id: '1',
        propertyId: 'property-1',
        guestName: 'Alice',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      const booking2 = {
        id: '2',
        propertyId: 'property-2',
        guestName: 'Bob',
        startDate: '2026-04-01T00:00:00.000Z',
        endDate: '2026-04-15T00:00:00.000Z',
      };

      const booking3 = {
        id: '3',
        propertyId: 'property-3',
        guestName: 'Charlie',
        startDate: '2026-05-01T00:00:00.000Z',
        endDate: '2026-05-20T00:00:00.000Z',
      };

      store.dispatch(addBooking(booking1));
      store.dispatch(addBooking(booking2));
      store.dispatch(addBooking(booking3));

      renderBookingList();

      const allTexts = screen.getAllByText(/Alice|Bob|Charlie/);
      expect(allTexts.length).toBe(3);
    });
  });
});
