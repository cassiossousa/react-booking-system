import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BookingList } from './BookingList';
import bookingsReducer, {
  addBooking,
} from '../../features/bookings/bookingsSlice';
import { theme } from '../../styles/theme';

describe('BookingList', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { bookings: bookingsReducer } });
  });

  const renderBookingList = () =>
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BookingList />
        </ThemeProvider>
      </Provider>,
    );

  it('renders empty state when no bookings', () => {
    renderBookingList();
    expect(screen.getByText(/No bookings yet/)).toBeInTheDocument();
  });

  it('renders bookings and details', () => {
    const booking = {
      id: '1',
      propertyId: 'property-1',
      propertyName: 'Property 1',
      guestName: 'John Doe',
      startDate: '2026-03-01',
      endDate: '2026-03-10',
    } as any;

    store.dispatch(addBooking(booking));
    renderBookingList();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Property 1')).toBeInTheDocument();
    expect(screen.getByText('2026-03-01 → 2026-03-10')).toBeInTheDocument();
  });

  it('sets editing when Edit is clicked and deletes when Delete is clicked', async () => {
    const user = userEvent.setup();

    const booking = {
      id: '1',
      propertyId: 'property-1',
      propertyName: 'Property 1',
      guestName: 'John Doe',
      startDate: '2026-03-01',
      endDate: '2026-03-10',
    } as any;

    store.dispatch(addBooking(booking));
    renderBookingList();

    const editButton = screen.getByRole('button', { name: /Edit/ });
    await user.click(editButton);

    await waitFor(() => {
      expect(store.getState().bookings.editing?.guestName).toBe('John Doe');
    });

    const deleteButton = screen.getByRole('button', { name: /Delete/ });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(store.getState().bookings.items.length).toBe(0);
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('does not render error UI (no error in state)', () => {
    // BookingList currently does not render an error banner; ensure
    // component renders empty state when there is no booking error.
    renderBookingList();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
