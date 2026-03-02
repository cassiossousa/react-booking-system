import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreatePropertySchema,
  type CreatePropertyInput,
} from '../../../features/properties/domain/property.schema';

import { Form } from '../../../ui/Form';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';

type Props = {
  onSubmit: (data: CreatePropertyInput) => void;
};

export const PropertiesForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(CreatePropertySchema),
    defaultValues: {
      name: '',
      location: '',
      capacity: 1,
    },
    mode: 'onBlur', // scalable UX choice
  });

  const submitHandler = (data: CreatePropertyInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <Input placeholder="Name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <Input placeholder="Location" {...register('location')} />
        {errors.location && (
          <p style={{ color: 'red' }}>{errors.location.message}</p>
        )}
      </div>

      <div>
        <Input
          type="number"
          min={1}
          {...register('capacity', { valueAsNumber: true })}
        />
        {errors.capacity && (
          <p style={{ color: 'red' }}>{errors.capacity.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Add Property
      </Button>
    </Form>
  );
};
