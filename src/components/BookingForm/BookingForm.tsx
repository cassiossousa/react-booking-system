import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuid } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addBooking,
  updateBooking,
  selectBooking,
} from '../../features/bookings/bookingsSlice';
import { selectSelectedBooking } from '../../features/bookings/selectors';

import {
  FormWrapper,
  Row,
  Input,
  Select,
  ErrorText,
  Button,
} from './BookingForm.styles';
import {
  bookingSchema,
  type BookingFormValues,
} from '../../features/bookings/bookings.schema';

export default function BookingForm() {
  const dispatch = useAppDispatch();
  const selectedBooking = useAppSelector(selectSelectedBooking);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (selectedBooking) {
      reset(selectedBooking);
    }
  }, [selectedBooking, reset]);

  const onSubmit = (data: BookingFormValues) => {
    setSubmitError(null);

    try {
      const booking = {
        id: selectedBooking?.id ?? uuid(),
        ...data,
      };

      if (selectedBooking) {
        dispatch(updateBooking(booking));
      } else {
        dispatch(addBooking(booking));
      }

      dispatch(selectBooking(null));
      reset();
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2>{selectedBooking ? 'Update Booking' : 'Create Booking'}</h2>

      <Select {...register('propertyId')}>
        <option value="">Select Property</option>
        <option value="property-1">Property 1</option>
        <option value="property-2">Property 2</option>
      </Select>
      {errors.propertyId && <ErrorText>{errors.propertyId.message}</ErrorText>}

      <Input placeholder="Guest Name" {...register('guestName')} />
      {errors.guestName && <ErrorText>{errors.guestName.message}</ErrorText>}

      <Row>
        <DatePicker
          selected={startDate ? new Date(startDate) : null}
          onChange={(date: Date | null) =>
            setValue('startDate', date?.toISOString() ?? '')
          }
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
        />

        <DatePicker
          selected={endDate ? new Date(endDate) : null}
          onChange={(date: Date | null) =>
            setValue('endDate', date?.toISOString() ?? '')
          }
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
        />
      </Row>

      {errors.startDate && <ErrorText>{errors.startDate.message}</ErrorText>}
      {errors.endDate && <ErrorText>{errors.endDate.message}</ErrorText>}

      {submitError && <ErrorText>{submitError}</ErrorText>}

      <Button type="submit">
        {selectedBooking ? 'Update Booking' : 'Create Booking'}
      </Button>
    </FormWrapper>
  );
}
