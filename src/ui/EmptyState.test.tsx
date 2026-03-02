import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import EmptyState from './EmptyState';

describe('<EmptyState />', () => {
  it('renders children', () => {
    render(
      <ThemeProvider theme={theme}>
        <EmptyState>No data</EmptyState>
      </ThemeProvider>,
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
