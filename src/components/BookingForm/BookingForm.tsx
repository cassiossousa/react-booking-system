import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Form, Row, Error } from './BookingForm.styles';
import { addBooking } from '../../features/bookings/bookingsSlice';

export const BookingForm = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    id: '',
    propertyId: '',
    propertyName: '',
    guestName: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.startDate >= form.endDate) {
      setError('End date must be after start date');
      return;
    }

    dispatch(addBooking(form));
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Property Name"
        onChange={(e) => setForm({ ...form, propertyName: e.target.value })}
      />

      <Input
        placeholder="Guest Name"
        onChange={(e) => setForm({ ...form, guestName: e.target.value })}
      />

      <Row>
        <Input
          type="date"
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <Input
          type="date"
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
      </Row>

      {error && <Error>{error}</Error>}

      <Button type="submit">Create Booking</Button>
    </Form>
  );
};
