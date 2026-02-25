export type BookingStatus = 'confirmed' | 'cancelled' | 'pending';

export interface Booking {
  id: string;

  // Reference only
  propertyId: string;

  guestName: string;

  startDate: string; // ISO
  endDate: string; // ISO

  status: BookingStatus;
  createdAt: string;
}

export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt'>;

export interface BookingsState {
  ids: string[];
  entities: Record<string, Booking>;
  selectedBookingId: string | null;
  loading: boolean;
  error: string | null;
}
