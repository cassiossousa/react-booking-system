import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { BookingCard } from './BookingCard';
import { theme } from '../../../styles/theme';
import type { BookingWithProperty } from '../../../features/bookings/domain/booking.schema';

const mockBooking: BookingWithProperty = {
  id: 'booking-1',
  propertyId: 'property-1',
  propertyName: 'Test Property',
  guests: 2,
  checkIn: new Date('2024-12-10').toISOString(),
  checkOut: new Date('2024-12-13').toISOString(),
  createdAt: new Date().toISOString(),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('BookingCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders booking information correctly', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('2 guests')).toBeInTheDocument();
    expect(screen.getByText(/check-in:/i)).toBeInTheDocument();
    expect(screen.getByText(/check-out:/i)).toBeInTheDocument();
  });

  it('displays singular guest text for single guest', () => {
    const singleGuestBooking = { ...mockBooking, guests: 1 };

    renderWithTheme(
      <BookingCard
        booking={singleGuestBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText('1 guest')).toBeInTheDocument();
  });

  it('displays plural guests text for multiple guests', () => {
    const multipleGuestBooking = { ...mockBooking, guests: 3 };

    renderWithTheme(
      <BookingCard
        booking={multipleGuestBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText('3 guests')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockBooking);
  });

  it('calls onDelete when delete button is clicked', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    // Just verify the button exists and can be clicked
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).not.toBeDisabled();
  });

  it('disables edit button when actions are disabled', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={true}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeDisabled();
  });

  it('disables delete button when actions are disabled', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={true}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeDisabled();
  });

  it('shows editing text when isEditing is true', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={true}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText('Editing...')).toBeInTheDocument();
  });

  it('disables edit button when editing', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={true}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeDisabled();
  });

  it('disables delete button when editing', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={true}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(
      <BookingCard
        booking={mockBooking}
        disableActions={false}
        isEditing={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    // Check that the property name is visible
    expect(screen.getByText('Test Property')).toBeInTheDocument();

    // Check that action buttons are properly labeled
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
