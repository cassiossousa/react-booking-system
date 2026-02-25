import {
  PropertyValidationError,
  PropertyAlreadyExistsError,
} from './property.errors';
import type { Property, CreatePropertyInput } from '../types';

export const validatePropertyInput = (input: CreatePropertyInput) => {
  if (!input.name.trim()) {
    throw new PropertyValidationError('Property name is required');
  }

  if (!input.location.trim()) {
    throw new PropertyValidationError('Property location is required');
  }

  if (input.capacity <= 0) {
    throw new PropertyValidationError('Capacity must be greater than 0');
  }
};

export const ensureUniquePropertyName = (
  input: CreatePropertyInput,
  existing: Property[],
) => {
  const duplicate = existing.some(
    (p) => p.name.toLowerCase().trim() === input.name.toLowerCase().trim(),
  );

  if (duplicate) {
    throw new PropertyAlreadyExistsError(
      'Property with this name already exists',
    );
  }
};
