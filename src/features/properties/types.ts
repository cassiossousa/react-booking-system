import type { Property } from './domain/property.schema';

export interface PropertiesState {
  entities: Record<string, Property>;
  ids: string[];

  selectedPropertyId: string | null;

  loading: boolean;
  error: string | null;
}

export type CreatePropertyInput = Omit<Property, 'id' | 'createdAt'>;

export interface PropertiesState {
  entities: Record<string, Property>;
  ids: string[];

  selectedPropertyId: string | null;

  loading: boolean;
  error: string | null;
}
