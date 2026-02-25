export type BookingStatus = 'confirmed' | 'cancelled' | 'pending';

export interface Booking {
  id: string;

  // Property info
  propertyId: string;
  propertyName: string;

  // Guest info
  guestName: string;

  // Dates (ISO strings only)
  startDate: string;
  endDate: string;

  // Domain metadata
  status: BookingStatus;
  createdAt: string;
}

/**
 * Input type used when creating a booking
 */
export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt'>;

/**
 * Redux slice state
 */
export interface BookingsState {
  entities: Record<string, Booking>;
  ids: string[];

  selectedBookingId: string | null;
  editing: Booking | null;

  error: string | null;
  loading: boolean;
}
