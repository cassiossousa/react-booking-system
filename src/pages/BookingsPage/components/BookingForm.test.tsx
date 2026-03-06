import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BookingForm } from './BookingForm';
import { theme } from '../../../styles/theme';
import bookingsSlice from '../../../features/bookings/bookings.slice';
import propertiesSlice from '../../../features/properties/properties.slice';

// Create a simple test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      bookings: bookingsSlice,
      properties: propertiesSlice,
    },
    preloadedState: {
      bookings: {
        entities: {},
        ids: [],
        selectedBookingId: null,
        loading: false,
        error: null,
      },
      properties: {
        entities: {},
        ids: [],
        selectedPropertyId: null,
        loading: false,
        error: null,
      },
    },
  });
};

// Mock only what's necessary
vi.mock('../../../features/bookings/bookings.utils', () => ({
  checkBookingOverlap: vi.fn(() => false),
}));

const renderWithTheme = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Provider>,
  );
};

describe('BookingForm', () => {
  it('renders form with all required fields', () => {
    renderWithTheme(<BookingForm />);

    expect(screen.getByText('Property')).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Check-in')).toBeInTheDocument();
    expect(screen.getByText('Check-out')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create booking/i }),
    ).toBeInTheDocument();
  });

  it('shows create booking button text by default', () => {
    renderWithTheme(<BookingForm />);

    expect(
      screen.getByRole('button', { name: /create booking/i }),
    ).toBeInTheDocument();
  });

  it('disables submit button when form is empty', () => {
    renderWithTheme(<BookingForm />);

    const submitButton = screen.getByRole('button', {
      name: /create booking/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('disables property select when no properties available', () => {
    renderWithTheme(<BookingForm />);

    const propertySelect = screen.getByRole('combobox');
    expect(propertySelect).toBeDisabled();
  });

  it('renders form with proper semantic structure', () => {
    renderWithTheme(<BookingForm />);

    expect(screen.getAllByRole('combobox')).toHaveLength(1); // property select
    expect(screen.getAllByRole('spinbutton')).toHaveLength(1); // guests input
    expect(screen.getAllByRole('button')).toHaveLength(1); // submit button
  });

  it('shows disabled state for all inputs when no properties', () => {
    renderWithTheme(<BookingForm />);

    const propertySelect = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button', {
      name: /create booking/i,
    });

    expect(propertySelect).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
