import { store } from './store';
import type { RootState, AppDispatch } from './store';

describe('Redux Store', () => {
  it('should have initial state', () => {
    const state = store.getState();

    expect(state).toBeDefined();
    expect(state.bookings).toBeDefined();
    expect(state.bookings.items).toEqual([]);
    expect(state.bookings.editing).toBeNull();
    expect(state.bookings.error).toBeNull();
  });

  it('should provide correct RootState type inference', () => {
    const state: RootState = store.getState();

    expect(state.bookings).toBeDefined();
    expect(Array.isArray(state.bookings.items)).toBe(true);
  });

  it('should have correct dispatch type', () => {
    const dispatch: AppDispatch = store.dispatch;

    expect(typeof dispatch).toBe('function');
  });

  it('should be able to subscribe to state changes', () => {
    const listener = () => {};
    const unsubscribe = store.subscribe(listener);

    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });

  it('should have bookings reducer', () => {
    const state = store.getState();

    expect(state.bookings).toBeDefined();
    expect(state.bookings.items).toBeDefined();
    expect(state.bookings.editing).toBeDefined();
    expect(state.bookings.error).toBeDefined();
  });
});
