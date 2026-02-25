export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}

export interface BookingWithProperty extends Booking {
  propertyName: string;
}
