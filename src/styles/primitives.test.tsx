import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import { theme } from './theme';
import {
  PageContainer,
  Card,
  Title,
  Subtitle,
  Row,
  Column,
} from './primitives';

describe('styles/primitives', () => {
  it('renders all primitive styled components inside ThemeProvider', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Title>Test Title</Title>
          <Subtitle>Test Subtitle</Subtitle>
          <Row>
            <Column>
              <Card>Content</Card>
            </Column>
          </Row>
        </PageContainer>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
