export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  startDate: string;
  endDate: string;
}

export interface BookingsState {
  entities: Record<string, Booking>;
  ids: string[];
  selectedBookingId: string | null;
  error: string | null;
}
