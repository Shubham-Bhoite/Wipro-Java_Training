import { Routes } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LandingPageComponent } from './landing-page/landing-page.component.new';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'book', component: BookingFormComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', redirectTo: '' }
];
