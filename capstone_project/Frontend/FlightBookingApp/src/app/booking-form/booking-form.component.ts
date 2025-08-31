import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { FlightResponse } from '../models/flight.model';
import { BookingRequest } from '../models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-form.component.html',
  styles: [`
    .disabled {
      opacity: 0.6;
      pointer-events: none;
    }
    
    .disabled input,
    .disabled button {
      opacity: 0.6;
      pointer-events: none;
    }
  `]
})
export class BookingFormComponent implements OnInit {
  booking: BookingRequest = {
    flightId: 0,
    passengerName: '',
    passengerEmail: ''
  };

  flight: FlightResponse | null = null;
  isLoading = false;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('BookingFormComponent initialized');
    // Get the current navigation state
    const state = history.state;
    console.log('History state:', state);
    
    if (state && state.flight) {
      console.log('Flight data found:', state.flight);
      this.flight = state.flight;
      if (this.flight) {
        this.booking.flightId = this.flight.flightId;
        console.log('Flight ID set:', this.booking.flightId);
      }
    } else {
      console.warn('No flight data found in state');
      // Try to get flight data from query parameters as fallback
      this.activatedRoute.queryParams.subscribe(params => {
        console.log('Query params:', params);
        if (params['flightId']) {
          // Create a basic flight object from query params
          this.flight = {
            flightId: +params['flightId'],
            flightName: 'Flight ' + params['flightId'],
            flightNumber: 'FL' + params['flightId'],
            airline: 'Airline',
            source: params['source'] || 'Unknown',
            destination: params['destination'] || 'Unknown',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            price: 0,
            time: '00:00'
          };
          this.booking.flightId = this.flight.flightId;
          console.log('Flight created from query params:', this.flight);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.flight) {
      console.error('No flight data available');
      return;
    }

    this.isLoading = true;
    console.log('Submitting booking:', this.booking);
    
    this.bookingService.createBooking(this.booking)
      .subscribe({
        next: (response) => {
          console.log('Booking created successfully:', response);
          this.isLoading = false;
          // Use bookingId from the response
          const bookingId = response.bookingId || response.id;
          console.log('Navigating to payment with ID:', bookingId);
          this.router.navigate(['/payment', bookingId]);
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.isLoading = false;
          alert('Failed to create booking. Please try again.');
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
