import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { PaymentRequest, BookingResponse } from '../models/booking.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
 
})
export class PaymentComponent implements OnInit {
  payment: PaymentRequest = {
    amount: 0,
    paymentMode: 'CARD',
    cardNumber: '',
    cvv: '',
    expiry: ''
  };

  booking: BookingResponse | null = null;
  isLoading = false;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));
    if (bookingId) {
      this.bookingService.getBookingById(bookingId).subscribe({
        next: (booking) => {
          this.booking = booking;
          const calculatedAmount = this.getBookingAmount();
          this.payment.amount = calculatedAmount;
          
          console.log('Booking loaded:', booking);
          console.log('Calculated amount:', calculatedAmount);
          console.log('Payment amount set to:', this.payment.amount);
          console.log('Flight details:', booking.flightDetails);
          console.log('Total amount:', booking.totalAmount);
          console.log('Payment object:', this.payment);
          
          if (!booking.flightDetails && !booking.flight) {
            console.log('No flight details found, this might cause price to be 0');
          }
          
          if (calculatedAmount <= 0) {
            console.error('WARNING: Payment amount is 0 or negative:', calculatedAmount);
            alert('Warning: Payment amount is invalid. Please check the booking details.');
          }
        },
        error: (error) => {
          console.error('Error loading booking:', error);
          alert('Failed to load booking details. Please try again.');
          this.router.navigate(['/bookings']);
        }
      });
    } else {
      alert('Invalid booking ID');
      this.router.navigate(['/bookings']);
    }
  }

  getBookingAmount(): number {
    console.log('getBookingAmount called with booking:', this.booking);
    
    if (this.booking?.totalAmount && this.booking.totalAmount > 0) {
      console.log('Using totalAmount:', this.booking.totalAmount);
      return this.booking.totalAmount;
    }
    
    if (this.booking?.flightDetails?.price && this.booking.flightDetails.price > 0) {
      console.log('Using flightDetails.price:', this.booking.flightDetails.price);
      return this.booking.flightDetails.price;
    }
    
    if (this.booking?.flight?.price && this.booking.flight.price > 0) {
      console.log('Using flight.price:', this.booking.flight.price);
      return this.booking.flight.price;
    }
    
    console.log('No price found, using default:', 5500);
    return 5500; 
  }

  getFlightRoute(booking: any): string {
    if (booking?.flightDetails?.source && booking?.flightDetails?.destination) {
      return `${booking.flightDetails.source} to ${booking.flightDetails.destination}`;
    }
    if (booking?.flight?.source && booking?.flight?.destination) {
      return `${booking.flight.source} to ${booking.flight.destination}`;
    }
    return 'Flight route';
  }

  getBookingId(booking: any): number {
    return booking.bookingId || booking.id || 0;
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    this.payment.cardNumber = value;
  }

  formatExpiry(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length > 5) {
      value = value.substring(0, 5);
    }
    this.payment.expiry = value;
  }

  onSubmit(): void {
    if (!this.booking) return;

    if (!this.isExpiryValid()) {
      alert('Please enter a valid expiry date (MM/YY format and not expired)');
      return;
    }

    if (!this.payment.cvv || this.payment.cvv.length < 3) {
      alert('Please enter a valid CVV (3 or 4 digits)');
      return;
    }

    if (!this.payment.cardNumber || this.payment.cardNumber.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }

    if (!this.payment.amount || this.payment.amount <= 0) {
      alert('Invalid payment amount. Please check the booking details.');
      console.error('Payment amount is invalid:', this.payment.amount);
      return;
    }

    this.isLoading = true;
    console.log('Submitting payment:', this.payment);
    console.log('For booking:', this.booking);
    
    const bookingId = this.getBookingId(this.booking);
    console.log('Using booking ID for payment:', bookingId);
    
    console.log('Payment data being sent to backend:', {
      bookingId: bookingId,
      payment: this.payment,
      amount: this.payment.amount,
      cardNumber: this.payment.cardNumber,
      expiry: this.payment.expiry,
      cvv: this.payment.cvv
    });

    this.bookingService.makePayment(bookingId, this.payment)
      .subscribe({
        next: (response) => {
          console.log('Payment response received:', response);
          this.isLoading = false;
          
          if (typeof response === 'string' && response.includes('Payment initiated')) {
            console.log('Payment successful - redirecting to bookings');

            this.router.navigate(['/bookings'], {
              state: { message: 'Payment initiated successfully! Your booking is being processed.' }
            });
          } else {
            console.log('Unexpected response format:', response);

            this.router.navigate(['/bookings'], {
              state: { message: 'Payment processed successfully!' }
            });
          }
        },
        error: (error) => {
          console.error('Error processing payment:', error);
          console.error('Error details:', error.error || error.message || error);
          this.isLoading = false;
          alert('Payment failed. Please try again. Check console for details.');
        }
      });
  }

  isExpiryValid(): boolean {
    if (!this.payment.expiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(this.payment.expiry)) {
      return false;
    }

    const [month, year] = this.payment.expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    
    return expiryDate > currentDate;
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}
