export interface BookingRequest {
  flightId: number;
  passengerName: string;
  passengerEmail: string;
}

export interface BookingResponse {
  id?: number; 
  bookingId: number; 
  flightId: number;
  passengerName: string;
  passengerEmail: string;
  bookingDate?: string; 
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'PAID' | 'INITIATED';
  flight?: any; 
  flightDetails?: {
    flightId: number;
    flightName: string;
    flightNumber: string;
    airline: string;
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number;
    time: string;
  };
  totalAmount?: number;
}

export interface PaymentRequest {
  amount: number;
  paymentMode: 'CARD';
  cardNumber: string;
  cvv: string;
  expiry: string;
}

export interface PaymentResponse {
  id: number;
  bookingId: number;
  amount: number;
  paymentMode: string;
  paymentDate: string;
  status: 'SUCCESS' | 'FAILED';
  transactionId: string;
}
