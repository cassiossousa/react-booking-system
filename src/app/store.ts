import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../features/bookings/bookings.slice';
import propertiesReducer from '../features/properties/properties.slice';

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    properties: propertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
