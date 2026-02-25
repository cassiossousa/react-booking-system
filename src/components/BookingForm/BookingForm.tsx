import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  bookingAdded,
  bookingUpdated,
  bookingSelected,
} from '../../features/bookings/bookingsSlice';
import { selectSelectedBooking } from '../../features/bookings/selectors';
import { selectAllProperties } from '../../features/properties/selectors';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Form, Row, Error } from './BookingForm.styles';
import type { Booking } from '../../features/bookings/types';
import { SelectWrapper } from '../../ui/SelectWrapper';
import { Select } from '../../ui/Select';

export const BookingForm = () => {
  const dispatch = useAppDispatch();

  const selectedBooking = useAppSelector(selectSelectedBooking);
  const properties = useAppSelector(selectAllProperties);

  const [error, setError] = useState('');
  const [form, setForm] = useState<Omit<Booking, 'id'>>({
    propertyId: '',
    guestName: '',
    checkIn: '',
    checkOut: '',
  });

  const isEditing = Boolean(selectedBooking);

  // Prefill form when editing
  useEffect(() => {
    if (selectedBooking) {
      const { propertyId, guestName, checkIn, checkOut } = selectedBooking;

      setForm({
        propertyId,
        guestName,
        checkIn,
        checkOut,
      });
    }
  }, [selectedBooking]);

  const resetForm = () => {
    setForm({
      propertyId: '',
      guestName: '',
      checkIn: '',
      checkOut: '',
    });
    setError('');
    dispatch(bookingSelected(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.propertyId) {
      setError('Please select a property');
      return;
    }

    if (!form.guestName) {
      setError('Guest name is required');
      return;
    }

    if (form.checkIn >= form.checkOut) {
      setError('Check-out must be after check-in');
      return;
    }

    if (isEditing && selectedBooking) {
      dispatch(
        bookingUpdated({
          id: selectedBooking.id,
          ...form,
        }),
      );
    } else {
      dispatch(
        bookingAdded({
          id: crypto.randomUUID(),
          ...form,
        }),
      );
    }

    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SelectWrapper>
        <Select
          value={form.propertyId}
          onChange={(e) =>
            setForm({
              ...form,
              propertyId: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Select property
          </option>

          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </Select>
      </SelectWrapper>

      <Input
        placeholder="Guest Name"
        value={form.guestName}
        onChange={(e) =>
          setForm({
            ...form,
            guestName: e.target.value,
          })
        }
      />

      <Row>
        <Input
          type="date"
          value={form.checkIn}
          onChange={(e) =>
            setForm({
              ...form,
              checkIn: e.target.value,
            })
          }
        />

        <Input
          type="date"
          value={form.checkOut}
          onChange={(e) =>
            setForm({
              ...form,
              checkOut: e.target.value,
            })
          }
        />
      </Row>

      {error && <Error>{error}</Error>}

      <Row>
        <Button type="submit">
          {isEditing ? 'Update Booking' : 'Create Booking'}
        </Button>

        {isEditing && (
          <Button type="button" variant="ghost" onClick={resetForm}>
            Cancel
          </Button>
        )}
      </Row>
    </Form>
  );
};
