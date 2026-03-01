import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

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
