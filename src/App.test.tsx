import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import bookingsReducer from './features/bookings/bookingsSlice';
import { theme } from './styles/theme';

describe('App Component', () => {
  const store = configureStore({
    reducer: {
      bookings: bookingsReducer,
    },
  });

  const renderApp = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>,
    );
  };

  it('should render without crashing', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { name: 'Booking Manager' }),
    ).toBeInTheDocument();
  });

  it('should render BookingPage component', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { name: 'Booking Manager' }),
    ).toBeInTheDocument();
  });

  it('should display the booking form', () => {
    renderApp();
    // BookingForm should be rendered as part of BookingPage
    const form = screen.getByRole('button', { name: /Create Booking/ });
    expect(form).toBeInTheDocument();
  });

  it('should export a component', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('should render the main heading', () => {
    renderApp();
    const heading = screen.getByRole('heading', {
      name: 'Booking Manager',
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render with proper structure', () => {
    const { container } = renderApp();
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('should contain no errors', () => {
    expect(() => {
      renderApp();
    }).not.toThrow();
  });
});
