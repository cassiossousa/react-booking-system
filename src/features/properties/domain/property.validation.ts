import {
  PropertyValidationError,
  PropertyAlreadyExistsError,
} from './property.errors';
import {
  CreatePropertySchema,
  type CreatePropertyInput,
  type Property,
} from './property.schema';

export const validatePropertyInput = (
  input: CreatePropertyInput,
): CreatePropertyInput => {
  const result = CreatePropertySchema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid property data';
    throw new PropertyValidationError(message);
  }

  return result.data;
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
