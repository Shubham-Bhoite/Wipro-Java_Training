import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BookingRequest,
  BookingResponse,
  PaymentRequest,
  PaymentResponse,
} from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:9191/booking/api';

  constructor(private http: HttpClient) {}

  createBooking(booking: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiUrl}/create`, booking);
  }

  getAllBookings(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/bookings`);
  }

  getBookingById(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.apiUrl}/booking/${id}`);
  }

  cancelBooking(id: number): Observable<BookingResponse> {
    return this.http.put<BookingResponse>(`${this.apiUrl}/booking/${id}/cancel`, {});
  }

  makePayment(bookingId: number, payment: PaymentRequest): Observable<any> {
    console.log('Service: Making payment request to:', `${this.apiUrl}/booking/${bookingId}/pay`);
    console.log('Service: Payment data:', payment);
    return this.http.post(`${this.apiUrl}/booking/${bookingId}/pay`, payment, { responseType: 'text' });
  }
}
