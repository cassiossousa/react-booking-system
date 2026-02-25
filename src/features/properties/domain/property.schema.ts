import { z } from 'zod';

export const PropertySchema = z.object({
  id: z.string().uuid(),

  name: z.string().min(1, 'Property name is required'),

  location: z.string().min(1, 'Property location is required'),

  capacity: z.number().int().positive('Capacity must be greater than 0'),

  createdAt: z.string().datetime(),
});

export const CreatePropertySchema = PropertySchema.omit({
  id: true,
  createdAt: true,
});

export type Property = z.infer<typeof PropertySchema>;
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
