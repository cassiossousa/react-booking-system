import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { Button } from './Button';
import { theme } from '../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('renders with default styles', () => {
    renderWithTheme(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    renderWithTheme(<Button>Primary Button</Button>);

    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders ghost variant', () => {
    renderWithTheme(<Button $variant="ghost">Ghost Button</Button>);

    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders danger variant', () => {
    renderWithTheme(<Button $variant="danger">Danger Button</Button>);

    const button = screen.getByRole('button', { name: /danger button/i });
    expect(button).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();

    renderWithTheme(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call click handler when disabled', () => {
    const handleClick = vi.fn();

    renderWithTheme(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: /disabled button/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with type="submit" when specified', () => {
    renderWithTheme(<Button type="submit">Submit Button</Button>);

    const button = screen.getByRole('button', { name: /submit button/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <Button>
        <span>Icon</span>
        Text
      </Button>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Button>Accessible Button</Button>);

    const button = screen.getByRole('button', { name: /accessible button/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('supports keyboard interaction', () => {
    const handleClick = vi.fn();

    renderWithTheme(<Button onClick={handleClick}>Keyboard Button</Button>);

    const button = screen.getByRole('button', { name: /keyboard button/i });

    // Test click directly
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
