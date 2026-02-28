import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../../features/bookings/bookings.slice';
import propertiesReducer from '../../features/properties/properties.slice';
import { BookingForm } from './BookingForm';

function renderWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      bookings: bookingsReducer,
      properties: propertiesReducer,
    },
    preloadedState,
  });

  const utils = render(
    <Provider store={store}>
      <BookingForm />
    </Provider>,
  );

  return { store, ...utils };
}

const mockProperty = {
  id: 'p1',
  name: 'Beach House',
};

describe('BookingForm', () => {
  beforeAll(() => {
    // Stable UUID for predictable testing
    global.crypto.randomUUID = () => 'a-b-c-d-e';
  });

  /* ------------------ CREATE MODE ------------------ */

  it('renders in create mode initially', () => {
    renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
    });

    expect(screen.getByText('Create Booking')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  /* ------------------ VALIDATION ------------------ */

  it('shows error if property is not selected', () => {
    renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
    });

    fireEvent.click(screen.getByText('Create Booking'));

    expect(screen.getByText('Please select a property')).toBeInTheDocument();
  });

  it('shows error if guest name is missing', () => {
    renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'p1' },
    });

    fireEvent.click(screen.getByText('Create Booking'));

    expect(screen.getByText('Guest name is required')).toBeInTheDocument();
  });

  it('shows error if check-out is before check-in', () => {
    renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'p1' },
    });

    fireEvent.change(screen.getByPlaceholderText('Guest Name'), {
      target: { value: 'John' },
    });

    const dateInputs = screen.getAllByDisplayValue('');
    fireEvent.change(dateInputs[0], { target: { value: '2026-01-10' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-01-05' } });

    fireEvent.click(screen.getByText('Create Booking'));

    expect(
      screen.getByText('Check-out must be after check-in'),
    ).toBeInTheDocument();
  });

  /* ------------------ SUCCESSFUL CREATE ------------------ */

  it('dispatches bookingAdded and resets form', () => {
    const { store } = renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'p1' },
    });

    fireEvent.change(screen.getByPlaceholderText('Guest Name'), {
      target: { value: 'John' },
    });

    const dateInputs = screen.getAllByDisplayValue('');
    fireEvent.change(dateInputs[0], { target: { value: '2026-01-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-01-05' } });

    fireEvent.click(screen.getByText('Create Booking'));

    const state = store.getState();

    expect(state.bookings.ids).toContain('fixed-uuid');
    expect(state.bookings.entities['fixed-uuid'].guestName).toBe('John');

    // Form reset
    expect(screen.getByPlaceholderText('Guest Name')).toHaveValue('');
  });

  /* ------------------ EDIT MODE ------------------ */

  it('prefills form when editing', () => {
    const preloadedState = {
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
      bookings: {
        ids: ['1'],
        entities: {
          '1': {
            id: '1',
            propertyId: 'p1',
            guestName: 'Jane',
            checkIn: '2026-01-01',
            checkOut: '2026-01-03',
          },
        },
        selectedBookingId: '1',
        loading: false,
        error: null,
      },
    };

    renderWithStore(preloadedState);

    expect(screen.getByText('Update Booking')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Guest Name')).toHaveValue('Jane');
  });

  it('dispatches bookingUpdated in edit mode', () => {
    const { store } = renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
      bookings: {
        ids: ['1'],
        entities: {
          '1': {
            id: '1',
            propertyId: 'p1',
            guestName: 'Jane',
            checkIn: '2026-01-01',
            checkOut: '2026-01-03',
          },
        },
        selectedBookingId: '1',
        loading: false,
        error: null,
      },
    });

    fireEvent.change(screen.getByPlaceholderText('Guest Name'), {
      target: { value: 'Updated' },
    });

    fireEvent.click(screen.getByText('Update Booking'));

    const state = store.getState();

    expect(state.bookings.entities['1'].guestName).toBe('Updated');
    expect(state.bookings.selectedBookingId).toBeNull();
  });

  /* ------------------ CANCEL ------------------ */

  it('resets form and clears selection on cancel', () => {
    const { store } = renderWithStore({
      properties: { ids: ['p1'], entities: { p1: mockProperty } },
      bookings: {
        ids: ['1'],
        entities: {
          '1': {
            id: '1',
            propertyId: 'p1',
            guestName: 'Jane',
            checkIn: '2026-01-01',
            checkOut: '2026-01-03',
          },
        },
        selectedBookingId: '1',
        loading: false,
        error: null,
      },
    });

    fireEvent.click(screen.getByText('Cancel'));

    expect(store.getState().bookings.selectedBookingId).toBeNull();
    expect(screen.getByPlaceholderText('Guest Name')).toHaveValue('');
  });
});
