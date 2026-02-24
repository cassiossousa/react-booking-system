import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer, {
  addBooking,
} from '../../features/bookings/bookingsSlice';
import { theme } from '../../styles/theme';
import { BookingForm } from './BookingForm';

describe('BookingForm', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { bookings: bookingsReducer },
    });
  });

  const renderBookingForm = () =>
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BookingForm />
        </ThemeProvider>
      </Provider>,
    );

  it('renders inputs and submit button', () => {
    renderBookingForm();
    expect(screen.getByPlaceholderText('Property Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Guest Name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Create Booking/ }),
    ).toBeInTheDocument();
  });

  it('submits a valid booking and adds it to the store', async () => {
    const user = userEvent.setup();
    const { container } = renderBookingForm();

    const propertyInput = screen.getByPlaceholderText('Property Name');
    const guestInput = screen.getByPlaceholderText('Guest Name');
    const dateInputs = container.querySelectorAll('input[type="date"]');

    await user.type(propertyInput, 'Property 1');
    await user.type(guestInput, 'Alice');
    fireEvent.change(dateInputs[0], { target: { value: '2026-03-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-03-10' } });

    await user.click(screen.getByRole('button', { name: /Create Booking/ }));

    await waitFor(() => {
      expect(store.getState().bookings.items.length).toBe(1);
      expect(store.getState().bookings.items[0].guestName).toBe('Alice');
    });
  });

  it('shows validation error when end date is before start date', async () => {
    const user = userEvent.setup();
    const { container } = renderBookingForm();

    const propertyInput = screen.getByPlaceholderText('Property Name');
    const guestInput = screen.getByPlaceholderText('Guest Name');
    const dateInputs = container.querySelectorAll('input[type="date"]');

    await user.type(propertyInput, 'Property 1');
    await user.type(guestInput, 'Bob');
    fireEvent.change(dateInputs[0], { target: { value: '2026-03-10' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-03-01' } });

    await user.click(screen.getByRole('button', { name: /Create Booking/ }));

    await waitFor(() => {
      expect(
        screen.getByText('End date must be after start date'),
      ).toBeInTheDocument();
    });
  });
});
