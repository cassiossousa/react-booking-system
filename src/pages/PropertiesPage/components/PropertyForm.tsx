import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedProperty } from '../../../features/properties/properties.selectors';
import { bookingsSelectors } from '../../../features/bookings/bookings.slice';

import { Field, Input } from '../../../ui/Input';
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

import { validateCapacityReduction } from '../../../features/properties/domain/property.validation';

export const PropertyForm = () => {
  const dispatch = useAppDispatch();
  const selectedProperty = useAppSelector(selectSelectedProperty);
  const allBookings = useAppSelector(bookingsSelectors.selectAll);

  const isEditing = Boolean(selectedProperty);

  const {
    register,
    handleSubmit,
    reset,
    setError,
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

  useEffect(() => {
    if (selectedProperty) {
      reset({
        name: selectedProperty.name,
        location: selectedProperty.location,
        capacity: selectedProperty.capacity,
      });
    }
  }, [selectedProperty, reset]);

  const onSubmit = (data: CreatePropertyInput) => {
    try {
      if (isEditing && selectedProperty) {
        validateCapacityReduction(
          selectedProperty.id,
          data.capacity,
          allBookings,
        );

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
    } catch (err) {
      setError('root', {
        message: (err as Error).message ?? 'Invalid property update',
      });
    }
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
      <Field label="Name" error={errors.name?.message}>
        <Input $hasError={!!errors.name} {...register('name')} />
      </Field>

      <Field label="Location" error={errors.location?.message}>
        <Input $hasError={!!errors.location} {...register('location')} />
      </Field>

      <Field label="Capacity" error={errors.capacity?.message}>
        <Input
          type="number"
          min={1}
          $hasError={!!errors.capacity}
          {...register('capacity', { valueAsNumber: true })}
        />
      </Field>

      {errors.root && <Error>{errors.root.message}</Error>}

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
