import { v4 as uuid } from 'uuid';
import {
  PropertySchema,
  CreatePropertySchema,
  type Property,
} from './property.schema';

export const createProperty = (
  input: unknown,
  existing: Property[],
): Property => {
  // Runtime validation
  const parsedInput = CreatePropertySchema.parse(input);

  // Unique name rule (still domain logic)
  const duplicate = existing.some(
    (p) =>
      p.name.toLowerCase().trim() === parsedInput.name.toLowerCase().trim(),
  );

  if (duplicate) {
    throw new Error('Property with this name already exists');
  }

  const property: Property = {
    ...parsedInput,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };

  // Final full validation safety check
  return PropertySchema.parse(property);
};
