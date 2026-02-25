import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { propertiesSelectors } from './propertiesSlice';

/**
 * Adapter selectors (direct re-exports)
 */
export const selectAllProperties = propertiesSelectors.selectAll;

export const selectPropertyById = propertiesSelectors.selectById;

export const selectPropertyIds = propertiesSelectors.selectIds;

export const selectPropertyEntities = propertiesSelectors.selectEntities;

/**
 * Extra selectors
 */
export const selectSelectedPropertyId = (state: RootState) =>
  state.properties.selectedPropertyId;

export const selectSelectedProperty = createSelector(
  selectSelectedPropertyId,
  propertiesSelectors.selectEntities,
  (selectedId, entities) =>
    selectedId ? (entities[selectedId] ?? null) : null,
);
