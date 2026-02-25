import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../../features/bookings/bookings.slice';
import propertiesReducer from '../../features/properties/properties.slice';
import { BookingList } from './BookingList';

function renderWithStore(preloadedState: any) {
  const store = configureStore({
    reducer: {
      bookings: bookingsReducer,
      properties: propertiesReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BookingList />
    </Provider>,
  );
}

describe('BookingList', () => {
  it('shows empty state', () => {
    renderWithStore({
      bookings: { ids: [], entities: {}, selectedBookingId: null },
      properties: { ids: [], entities: {}, selectedPropertyId: null },
    });

    expect(screen.getByText(/no bookings yet/i)).toBeInTheDocument();
  });

  it('renders bookings', () => {
    renderWithStore({
      bookings: {
        ids: ['1'],
        entities: {
          '1': {
            id: '1',
            propertyId: 'p1',
            guestName: 'John',
            checkIn: '2026-01-01',
            checkOut: '2026-01-02',
          },
        },
        selectedBookingId: null,
      },
      properties: {
        ids: ['p1'],
        entities: {
          p1: { id: 'p1', name: 'Villa' },
        },
        selectedPropertyId: null,
      },
    });

    expect(screen.getByText(/john/i)).toBeInTheDocument();
  });
});
