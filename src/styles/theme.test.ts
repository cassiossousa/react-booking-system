import { describe, it, expect } from 'vitest';
import { theme } from './theme';

describe('Theme', () => {
  it('should have colors object', () => {
    expect(theme.colors).toBeDefined();
  });

  it('should have primary color', () => {
    expect(theme.colors.primary).toBe('#2563eb');
  });

  it('should have danger color', () => {
    expect(theme.colors.danger).toBe('#dc2626');
  });

  it('should have background color', () => {
    expect(theme.colors.background).toBe('#f9fafb');
  });

  it('should have text color', () => {
    expect(theme.colors.text).toBe('#111827');
  });

  it('should have all required color properties', () => {
    const requiredColors = ['primary', 'danger', 'background', 'text'];

    requiredColors.forEach((color) => {
      expect(theme.colors).toHaveProperty(color);
      expect(typeof theme.colors[color as keyof typeof theme.colors]).toBe(
        'string',
      );
    });
  });

  it('should all colors be valid hex values', () => {
    const hexColorRegex = /^#[0-9A-F]{6}$/i;
    const colors = Object.values(theme.colors);

    colors.forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });
  });

  it('should have consistent theme structure', () => {
    expect(typeof theme).toBe('object');
    expect(Object.keys(theme)).toContain('colors');
  });
});
