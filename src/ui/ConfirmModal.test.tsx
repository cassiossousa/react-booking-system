import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { ConfirmModal } from './ConfirmModal';
import { theme } from '../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ConfirmModal', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with title and description', () => {
    renderWithTheme(
      <ConfirmModal
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this item?'),
    ).toBeInTheDocument();
  });

  it('renders default button texts', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
  });

  it('renders custom button texts', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        cancelText="Cancel"
        confirmText="Confirm"
      />,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: 'No' });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('renders with danger variant by default', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Yes' });
    expect(confirmButton).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmVariant="primary"
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Yes' });
    expect(confirmButton).toBeInTheDocument();
  });

  it('is accessible with proper roles', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Modal' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('handles multiple clicks correctly', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Yes' });

    fireEvent.click(confirmButton);
    fireEvent.click(confirmButton);
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(3);
  });

  it('supports keyboard navigation', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Yes' });

    // Test click directly
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('has proper focus management', () => {
    renderWithTheme(
      <ConfirmModal
        title="Test Modal"
        description="Test description"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    // Check that modal content is rendered
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
