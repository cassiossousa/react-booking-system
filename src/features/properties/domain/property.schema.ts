import { z } from 'zod';

export const PropertySchema = z.object({
  id: z.uuid(),

  name: z.string().min(1, 'Property name is required'),

  location: z.string().min(1, 'Property location is required'),

  capacity: z
    .number()
    .int('Capacity must be an integer')
    .min(1, 'Capacity must be at least 1'),

  createdAt: z.iso.datetime(),
});

export const CreatePropertySchema = PropertySchema.omit({
  id: true,
  createdAt: true,
});

export type Property = z.infer<typeof PropertySchema>;
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
