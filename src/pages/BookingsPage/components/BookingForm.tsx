import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  saveBooking,
  bookingSelected,
} from '../../../features/bookings/bookings.slice';

import { selectSelectedBooking } from '../../../features/bookings/bookings.selectors';
import { selectAllProperties } from '../../../features/properties/properties.selectors';

import { Field, Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { SelectWrapper } from '../../../ui/Select';
import { Error, Form } from '../../../ui/Form';
import { Row } from '../../../styles/primitives';

import {
  CreateBookingSchema,
  type CreateBookingInput,
} from '../../../features/bookings/domain/booking.schema';

export const BookingForm = () => {
  const dispatch = useAppDispatch();
  const selectedBooking = useAppSelector(selectSelectedBooking);
  const properties = useAppSelector(selectAllProperties);
  const loading = useAppSelector((state) => state.bookings.loading);
  const domainError = useAppSelector((state) => state.bookings.error);
  const isEditing = Boolean(selectedBooking);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<CreateBookingInput>({
    resolver: zodResolver(CreateBookingSchema),
    defaultValues: {
      propertyId: '',
      guests: 1,
      checkIn: format(new Date(), 'yyyy-MM-dd'),
      checkOut: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    },
    mode: 'onBlur',
  });

  // Prefill when editing
  useEffect(() => {
    if (selectedBooking) {
      reset({
        propertyId: selectedBooking.propertyId,
        guests: selectedBooking.guests,
        checkIn: format(new Date(selectedBooking.checkIn), 'yyyy-MM-dd'),
        checkOut: format(new Date(selectedBooking.checkOut), 'yyyy-MM-dd'),
      });
    }
  }, [selectedBooking, reset]);

  const onSubmit = async (data: CreateBookingInput) => {
    if (!properties.length) {
      setError('root', { message: 'Create a property first.' });
      return;
    }

    const toIso = (dateStr: string) =>
      new Date(`${dateStr}T00:00:00`).toISOString();

    const payload = {
      id: selectedBooking?.id ?? crypto.randomUUID(),
      propertyId: data.propertyId,
      guests: data.guests,
      checkIn: toIso(data.checkIn),
      checkOut: toIso(data.checkOut),
      createdAt: selectedBooking?.createdAt ?? new Date().toISOString(),
    };

    const result = await dispatch(saveBooking(payload));

    if (saveBooking.rejected.match(result)) {
      setError('root', {
        message: result.payload ?? 'Failed to save booking',
      });
      return;
    }

    handleReset();
  };

  const handleReset = () => {
    reset({
      propertyId: '',
      guests: 1,
      checkIn: format(new Date(), 'yyyy-MM-dd'),
      checkOut: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    });

    dispatch(bookingSelected(null));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Property" error={errors.propertyId?.message}>
        <SelectWrapper $hasError={!!errors.propertyId}>
          <select {...register('propertyId')} disabled={!properties.length}>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </SelectWrapper>
      </Field>

      <Field label="Guests" error={errors.guests?.message}>
        <Input
          type="number"
          min={1}
          $hasError={!!errors.guests}
          {...register('guests', { valueAsNumber: true })}
        />
      </Field>

      <Field label="Check-in">
        <Input type="date" {...register('checkIn')} />
      </Field>

      <Field label="Check-out">
        <Input type="date" {...register('checkOut')} />
      </Field>

      {(errors.checkIn || errors.checkOut) && (
        <Error>{errors.checkIn?.message || errors.checkOut?.message}</Error>
      )}

      {errors.root && <Error>{errors.root.message}</Error>}
      {domainError && !errors.root && <Error>{domainError}</Error>}

      <Row>
        <Button type="submit" disabled={loading || !isValid}>
          {loading
            ? 'Saving...'
            : isEditing
              ? 'Update Booking'
              : 'Create Booking'}
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
