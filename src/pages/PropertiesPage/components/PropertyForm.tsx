import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedProperty } from '../../../features/properties/properties.selectors';

import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Error, Form } from '../../../ui/Form';
import { Row } from '../../../styles/primitives';

import {
  CreatePropertySchema,
  type CreatePropertyInput,
} from '../../../features/properties/domain/property.schema';

import {
  propertyAdded,
  propertySelected,
  propertyUpdated,
} from '../../../features/properties/properties.slice';

export const PropertyForm = () => {
  const dispatch = useAppDispatch();
  const selectedProperty = useAppSelector(selectSelectedProperty);
  const isEditing = Boolean(selectedProperty);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(CreatePropertySchema),
    defaultValues: {
      name: '',
      location: '',
      capacity: 1,
    },
    mode: 'onBlur',
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedProperty) {
      const { name, location, capacity } = selectedProperty;

      reset({
        name,
        location,
        capacity,
      });
    }
  }, [selectedProperty, reset]);

  const onSubmit = (data: CreatePropertyInput) => {
    if (isEditing && selectedProperty) {
      dispatch(
        propertyUpdated({
          ...selectedProperty,
          ...data,
        }),
      );
    } else {
      dispatch(
        propertyAdded({
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }),
      );
    }

    handleReset();
  };

  const handleReset = () => {
    reset({
      name: '',
      location: '',
      capacity: 1,
    });

    dispatch(propertySelected(null));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Name" {...register('name')} />
      {errors.name && <Error>{errors.name.message}</Error>}

      <Input placeholder="Location" {...register('location')} />
      {errors.location && <Error>{errors.location.message}</Error>}

      <Input
        type="number"
        min={1}
        {...register('capacity', { valueAsNumber: true })}
      />
      {errors.capacity && <Error>{errors.capacity.message}</Error>}

      <Row>
        <Button type="submit">
          {isEditing ? 'Update Property' : 'Create Property'}
        </Button>

        {isEditing && (
          <Button type="button" $variant="ghost" onClick={handleReset}>
            Cancel
          </Button>
        )}
      </Row>
    </Form>
  );
};
