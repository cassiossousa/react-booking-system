import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import { store } from './store';
import type { ReactNode } from 'react';

describe('Custom Redux Hooks', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  describe('useAppDispatch', () => {
    it('should return dispatch function', () => {
      const { result } = renderHook(() => useAppDispatch(), { wrapper });

      expect(typeof result.current).toBe('function');
    });

    it('should return same dispatch function on multiple calls', () => {
      const { result: result1 } = renderHook(() => useAppDispatch(), {
        wrapper,
      });
      const { result: result2 } = renderHook(() => useAppDispatch(), {
        wrapper,
      });

      expect(result1.current).toBe(result2.current);
    });

    it('should be able to dispatch actions', () => {
      const { result } = renderHook(() => useAppDispatch(), { wrapper });
      const dispatch = result.current;

      expect(() => {
        dispatch({ type: 'UNKNOWN_ACTION' });
      }).not.toThrow();
    });
  });

  describe('useAppSelector', () => {
    it('should return selected state', () => {
      const { result } = renderHook(
        () => useAppSelector((state) => state.bookings.ids),
        { wrapper },
      );

      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current).toEqual([]);
    });

    it('should return selected booking id', () => {
      const { result } = renderHook(
        () => useAppSelector((state) => state.bookings.selectedBookingId),
        { wrapper },
      );

      expect(result.current).toBeNull();
    });

    it('should select specific property from state', () => {
      const { result } = renderHook(
        () => useAppSelector((state) => state.bookings),
        { wrapper },
      );

      expect(result.current.entities).toBeDefined();
      expect(result.current.selectedBookingId).toBeDefined();
      expect(result.current.ids).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should provide typed selector', () => {
      const { result } = renderHook(
        () => useAppSelector((state) => state.bookings.ids.length),
        { wrapper },
      );

      expect(typeof result.current).toBe('number');
    });
  });

  describe('Integration with Redux', () => {
    it('useAppDispatch and useAppSelector should work together', () => {
      const { result: dispatchResult } = renderHook(() => useAppDispatch(), {
        wrapper,
      });
      const { result: selectorResult } = renderHook(
        () => useAppSelector((state) => state.bookings.ids.length),
        { wrapper },
      );

      expect(selectorResult.current).toBe(0);
      expect(typeof dispatchResult.current).toBe('function');
    });
  });
});
