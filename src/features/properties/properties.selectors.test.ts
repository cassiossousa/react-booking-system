import {
  selectAllProperties,
  selectSelectedProperty,
} from './properties.selectors';
import type { RootState } from '../../app/store';

const mockState: RootState = {
  properties: {
    ids: ['p1'],
    entities: {
      p1: {
        id: 'p1',
        name: 'Beach House',
        location: 'Miami',
      },
    },
    selectedPropertyId: 'p1',
    loading: false,
    error: null,
  },
  bookings: {
    ids: [],
    entities: {},
    selectedBookingId: null,
    loading: false,
    error: null,
  },
};

describe('property selectors', () => {
  it('selects all properties', () => {
    const result = selectAllProperties(mockState);
    expect(result).toHaveLength(1);
  });

  it('selects selected property', () => {
    const result = selectSelectedProperty(mockState);
    expect(result?.id).toBe('p1');
  });
});
