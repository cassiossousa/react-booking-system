import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Property {
  id: string;
  name: string;
  location: string;
}

const propertiesAdapter = createEntityAdapter<Property>();

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: propertiesAdapter.getInitialState(),
  reducers: {
    propertyAdded: propertiesAdapter.addOne,
    propertyUpdated: propertiesAdapter.upsertOne,
    propertyRemoved: propertiesAdapter.removeOne,
  },
});

export const { propertyAdded, propertyUpdated, propertyRemoved } =
  propertiesSlice.actions;

export default propertiesSlice.reducer;

export const propertiesSelectors = propertiesAdapter.getSelectors<RootState>(
  (state) => state.properties,
);
