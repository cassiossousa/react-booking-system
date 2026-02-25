import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Property {
  id: string;
  name: string;
  location: string;
}

const propertiesAdapter = createEntityAdapter<Property>();

// Extend adapter state properly
const initialState = propertiesAdapter.getInitialState({
  selectedPropertyId: null as string | null,
  loading: false,
  error: null as string | null,
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    propertyAdded: propertiesAdapter.addOne,
    propertyUpdated: propertiesAdapter.upsertOne,
    propertyRemoved: propertiesAdapter.removeOne,

    propertySelected(state, action: PayloadAction<string | null>) {
      state.selectedPropertyId = action.payload;
    },
  },
});

export const {
  propertyAdded,
  propertyUpdated,
  propertyRemoved,
  propertySelected,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

/**
 * Adapter selectors
 */
export const propertiesSelectors = propertiesAdapter.getSelectors<RootState>(
  (state) => state.properties,
);
