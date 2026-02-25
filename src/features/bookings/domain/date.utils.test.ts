import { describe, it, expect } from 'vitest';
import { hasDateConflict, isOverlapping, isValidDateRange } from './date.utils';

describe('isValidDateRange()', () => {
  it('returns true for valid range', () => {
    expect(isValidDateRange('2025-01-01', '2025-01-05')).toBe(true);
  });

  it('returns false if same day', () => {
    expect(isValidDateRange('2025-01-01', '2025-01-01')).toBe(false);
  });

  it('returns false if start after end', () => {
    expect(isValidDateRange('2025-01-10', '2025-01-05')).toBe(false);
  });

  it('returns false if empty', () => {
    expect(isValidDateRange('', '')).toBe(false);
  });
});

describe('isOverlapping()', () => {
  it('detects partial overlap', () => {
    expect(
      isOverlapping('2025-01-01', '2025-01-05', '2025-01-03', '2025-01-07'),
    ).toBe(true);
  });

  it('detects full containment', () => {
    expect(
      isOverlapping('2025-01-01', '2025-01-10', '2025-01-03', '2025-01-05'),
    ).toBe(true);
  });

  it('returns false when adjacent (end = start)', () => {
    expect(
      isOverlapping('2025-01-01', '2025-01-05', '2025-01-05', '2025-01-10'),
    ).toBe(false);
  });

  it('returns false when completely separate', () => {
    expect(
      isOverlapping('2025-01-01', '2025-01-03', '2025-01-05', '2025-01-07'),
    ).toBe(false);
  });
});

describe('hasDateConflict()', () => {
  const bookings = [
    {
      id: '1',
      propertyId: 'p1',
      startDate: '2025-01-01',
      endDate: '2025-01-05',
    },
  ];

  it('detects conflict on same property', () => {
    expect(hasDateConflict('2025-01-03', '2025-01-06', 'p1', bookings)).toBe(
      true,
    );
  });

  it('does not detect conflict on different property', () => {
    expect(hasDateConflict('2025-01-03', '2025-01-06', 'p2', bookings)).toBe(
      false,
    );
  });

  it('ignores booking when updating', () => {
    expect(
      hasDateConflict('2025-01-02', '2025-01-04', 'p1', bookings, '1'),
    ).toBe(false);
  });
});
