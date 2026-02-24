import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../../features/bookings/bookingsSlice';
import {
  addBooking,
  selectBooking,
} from '../../features/bookings/bookingsSlice';
import { theme } from '../../styles/theme';
import { BookingForm } from './BookingForm';

describe('BookingForm', () => {
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

  const renderBookingForm = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BookingForm />
        </ThemeProvider>
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('should render the form with create booking title', () => {
      renderBookingForm();
      expect(
        screen.getByRole('heading', { name: 'Create Booking' }),
      ).toBeInTheDocument();
    });

    it('should render property selector', () => {
      renderBookingForm();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select Property')).toBeInTheDocument();
    });

    it('should render guest name input', () => {
      renderBookingForm();
      expect(screen.getByPlaceholderText('Guest Name')).toBeInTheDocument();
    });

    it('should render start and end date pickers', () => {
      renderBookingForm();
      const dateInputs = screen.getAllByPlaceholderText(/Date/);
      expect(dateInputs.length).toBeGreaterThanOrEqual(2);
    });

    it('should render submit button', () => {
      renderBookingForm();
      expect(
        screen.getByRole('button', { name: /Create Booking/ }),
      ).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      renderBookingForm();

      const propertySelect = screen.getByRole('combobox');
      const guestNameInput = screen.getByPlaceholderText('Guest Name');
      const dateInputs = screen.getAllByPlaceholderText(/Date/);

      await user.selectOptions(propertySelect, 'property-1');
      await user.type(guestNameInput, 'John Doe');

      // Manually set date values since date picker requires calendar interaction
      fireEvent.change(dateInputs[0], { target: { value: '2026-03-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-03-10' } });

      const submitButton = screen.getByRole('button', {
        name: /Create Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(store.getState().bookings.ids.length).toBe(1);
        expect(
          store.getState().bookings.entities[store.getState().bookings.ids[0]],
        ).toMatchObject({
          propertyId: 'property-1',
          guestName: 'John Doe',
        });
      });
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      renderBookingForm();

      const propertySelect = screen.getByRole('combobox');
      const guestNameInput = screen.getByPlaceholderText(
        'Guest Name',
      ) as HTMLInputElement;
      const dateInputs = screen.getAllByPlaceholderText(/Date/);

      await user.selectOptions(propertySelect, 'property-1');
      await user.type(guestNameInput, 'John Doe');
      fireEvent.change(dateInputs[0], { target: { value: '2026-03-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-03-10' } });

      const submitButton = screen.getByRole('button', {
        name: /Create Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(guestNameInput.value).toBe('');
      });
    });
  });

  describe('Form Validation', () => {
    it('should show error for empty property', async () => {
      const user = userEvent.setup();
      renderBookingForm();

      const guestNameInput = screen.getByPlaceholderText('Guest Name');
      const dateInputs = screen.getAllByPlaceholderText(/Date/);

      await user.type(guestNameInput, 'John Doe');
      fireEvent.change(dateInputs[0], { target: { value: '2026-03-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-03-10' } });

      const submitButton = screen.getByRole('button', {
        name: /Create Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Property is required')).toBeInTheDocument();
      });
    });

    it('should show error for short guest name', async () => {
      const user = userEvent.setup();
      renderBookingForm();

      const propertySelect = screen.getByRole('combobox');
      const guestNameInput = screen.getByPlaceholderText('Guest Name');
      const dateInputs = screen.getAllByPlaceholderText(/Date/);

      await user.selectOptions(propertySelect, 'property-1');
      await user.type(guestNameInput, 'J');
      fireEvent.change(dateInputs[0], { target: { value: '2026-03-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-03-10' } });

      const submitButton = screen.getByRole('button', {
        name: /Create Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Guest name must be at least 2 characters'),
        ).toBeInTheDocument();
      });
    });

    it('should show error when end date is before start date', async () => {
      const user = userEvent.setup();
      renderBookingForm();

      const propertySelect = screen.getByRole('combobox');
      const guestNameInput = screen.getByPlaceholderText('Guest Name');
      const dateInputs = screen.getAllByPlaceholderText(/Date/);

      await user.selectOptions(propertySelect, 'property-1');
      await user.type(guestNameInput, 'John Doe');
      fireEvent.change(dateInputs[0], { target: { value: '2026-03-10' } });
      fireEvent.change(dateInputs[1], { target: { value: '2026-03-01' } });

      const submitButton = screen.getByRole('button', {
        name: /Create Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('End date must be after start date'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Edit Booking', () => {
    it('should populate form with selected booking', async () => {
      const testBooking = {
        id: '1',
        propertyId: 'property-1',
        propertyName: 'Property 1',
        guestName: 'Jane Smith',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(testBooking));
      store.dispatch(selectBooking(testBooking.id));

      renderBookingForm();

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Update Booking' }),
        ).toBeInTheDocument();
      });

      const propertySelect = screen.getByRole('combobox') as HTMLSelectElement;
      expect(propertySelect.value).toBe('property-1');

      const guestNameInput = screen.getByPlaceholderText(
        'Guest Name',
      ) as HTMLInputElement;
      expect(guestNameInput.value).toBe('Jane Smith');
    });

    it('should show update button when booking is selected', async () => {
      const testBooking = {
        id: '1',
        propertyId: 'property-1',
        propertyName: 'Property 1',
        guestName: 'Jane Smith',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(testBooking));
      store.dispatch(selectBooking(testBooking.id));

      renderBookingForm();

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Update Booking/ }),
        ).toBeInTheDocument();
      });
    });

    it('should update booking and deselect after submission', async () => {
      const user = userEvent.setup();

      const testBooking = {
        id: '1',
        propertyId: 'property-1',
        propertyName: 'Property 1',
        guestName: 'Jane Smith',
        startDate: '2026-03-01T00:00:00.000Z',
        endDate: '2026-03-10T00:00:00.000Z',
      };

      store.dispatch(addBooking(testBooking));
      store.dispatch(selectBooking(testBooking.id));

      renderBookingForm();

      const guestNameInput = screen.getByPlaceholderText(
        'Guest Name',
      ) as HTMLInputElement;

      await waitFor(() => {
        expect(guestNameInput.value).toBe('Jane Smith');
      });

      await user.clear(guestNameInput);
      await user.type(guestNameInput, 'Updated Name');

      const submitButton = screen.getByRole('button', {
        name: /Update Booking/,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(store.getState().bookings.entities['1'].guestName).toBe(
          'Updated Name',
        );
        expect(store.getState().bookings.selectedBookingId).toBeNull();
      });
    });
  });
});
