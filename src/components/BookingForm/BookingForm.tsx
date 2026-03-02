import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  bookingAdded,
  bookingUpdated,
  bookingSelected,
} from '../../features/bookings/bookings.slice';

import { selectSelectedBooking } from '../../features/bookings/bookings.selectors';
import { selectAllProperties } from '../../features/properties/properties.selectors';

import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { SelectWrapper } from '../../ui/SelectWrapper';
import { Select } from '../../ui/Select';
import { Error, Form } from '../../ui/Form';
import { Row } from '../../styles/primitives';

import {
  CreateBookingSchema,
  type CreateBookingInput,
} from '../../features/bookings/domain/booking.schema';

export const BookingForm = () => {
  const dispatch = useAppDispatch();
  const selectedBooking = useAppSelector(selectSelectedBooking);
  const properties = useAppSelector(selectAllProperties);

  const isEditing = Boolean(selectedBooking);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookingInput>({
    resolver: zodResolver(CreateBookingSchema),
    defaultValues: {
      propertyId: '',
      guestName: '',
      checkIn: '',
      checkOut: '',
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedBooking) {
      const { propertyId, guestName, checkIn, checkOut } = selectedBooking;

      reset({
        propertyId,
        guestName,
        checkIn,
        checkOut,
      });
    }
  }, [selectedBooking, reset]);

  const onSubmit = (data: CreateBookingInput) => {
    if (isEditing && selectedBooking) {
      dispatch(
        bookingUpdated({
          id: selectedBooking.id,
          createdAt: selectedBooking.createdAt,
          ...data,
        }),
      );
    } else {
      dispatch(
        bookingAdded({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...data,
        }),
      );
    }

    handleReset();
  };

  const handleReset = () => {
    reset({
      propertyId: '',
      guestName: '',
      checkIn: '',
      checkOut: '',
    });

    dispatch(bookingSelected(null));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SelectWrapper>
        <Select {...register('propertyId')}>
          <option value="">Select property</option>

          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </Select>
      </SelectWrapper>

      {errors.propertyId && <Error>{errors.propertyId.message}</Error>}

      <Input placeholder="Guest Name" {...register('guestName')} />

      {errors.guestName && <Error>{errors.guestName.message}</Error>}

      <Row>
        <Input type="date" {...register('checkIn')} />

        <Input type="date" {...register('checkOut')} />
      </Row>

      {(errors.checkIn || errors.checkOut) && (
        <Error>{errors.checkIn?.message || errors.checkOut?.message}</Error>
      )}

      <Row>
        <Button type="submit">
          {isEditing ? 'Update Booking' : 'Create Booking'}
        </Button>

        {isEditing && (
          <Button type="button" variant="ghost" onClick={handleReset}>
            Cancel
          </Button>
        )}
      </Row>
    </Form>
  );
};
