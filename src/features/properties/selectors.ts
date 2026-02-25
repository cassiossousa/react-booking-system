import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectPropertiesState = (state: RootState) => state.properties;

export const selectAllProperties = createSelector(
  selectPropertiesState,
  (state) => state.ids.map((id) => state.entities[id]),
);

export const selectPropertyById = (propertyId: string) =>
  createSelector(
    selectPropertiesState,
    (state) => state.entities[propertyId] ?? null,
  );

export const selectSelectedProperty = createSelector(
  selectPropertiesState,
  (state) =>
    state.selectedPropertyId ? state.entities[state.selectedPropertyId] : null,
);
