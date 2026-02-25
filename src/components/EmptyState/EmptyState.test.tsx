import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders children', () => {
    render(<EmptyState>No data</EmptyState>);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
