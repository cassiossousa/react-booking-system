export type BookingStatus = 'confirmed' | 'cancelled' | 'pending';

export interface Booking {
  id: string;
  customerName: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  status: BookingStatus;
  createdAt: string;
}
