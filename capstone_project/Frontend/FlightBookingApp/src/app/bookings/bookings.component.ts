import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';
import { BookingResponse } from '../models/booking.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: BookingResponse[] = [];
  successMessage: string = '';

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshBookings();
  }

  refreshBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (bookings: BookingResponse[]) => {
        this.bookings = bookings;
      },
      error: (error: any) => {
        console.error('Error fetching bookings:', error);
      }
    });
  }

  cancelBooking(id: number): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(id).subscribe({
        next: () => {
          this.successMessage = 'Booking cancelled successfully!';
          this.refreshBookings();
        },
        error: (error: any) => {
          console.error('Error cancelling booking:', error);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
      case 'PAID':
        return 'bg-success text-white';
      case 'PENDING':
      case 'INITIATED':
        return 'bg-warning text-dark';
      case 'CANCELLED':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}
