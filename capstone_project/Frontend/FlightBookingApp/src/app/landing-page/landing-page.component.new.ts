import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { Router } from '@angular/router';
import { FlightResponse, AirlineResponse } from '../models/flight.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  selectedSourceCode: string = '';
  selectedDestinationCode: string = '';
  selectedSourceName: string = '';
  selectedDestinationName: string = '';
  selectedDate: string = '';
  minDate: string = '';

  airports: AirlineResponse[] = [];
  flights: FlightResponse[] = [];
  filteredFlights: FlightResponse[] = [];
  uniqueAirlines: AirlineResponse[] = [];

  loadingAirlines = false;
  searching = false;
  searchPerformed = false;

  // Filter options
  priceFilter: number = 50000;
  maxPrice: number = 50000;
  selectedAirlines: number[] = [];
  sortBy: string = 'price';

  // Flight details modal
  selectedFlight: FlightResponse | null = null;

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.selectedDate = this.minDate;
  }

  ngOnInit(): void {
    this.loadAirlines();
  }

  loadAirlines(): void {
    if (this.airports.length > 0 || this.loadingAirlines) return;

    this.loadingAirlines = true;
    this.flightService.getAllAirlines().subscribe({
      next: (airports) => {
        this.airports = airports;
        this.loadingAirlines = false;
      },
      error: (error) => {
        console.error('Error loading airports:', error);
        this.loadingAirlines = false;
        this.airports = [
          { airportId: 1, airportName: 'Delhi', airportCode: 'DEL', address: 'Delhi' },
          { airportId: 2, airportName: 'Mumbai', airportCode: 'BOM', address: 'Mumbai' },
          { airportId: 3, airportName: 'Bangalore', airportCode: 'BLR', address: 'Bangalore' },
          { airportId: 4, airportName: 'Chennai', airportCode: 'MAA', address: 'Chennai' },
          { airportId: 5, airportName: 'Kolkata', airportCode: 'CCU', address: 'Kolkata' },
          { airportId: 6, airportName: 'Hyderabad', airportCode: 'HYD', address: 'Hyderabad' },
        ];
      },
    });
  }

  selectSource(airport: AirlineResponse): void {
    this.selectedSourceCode = airport.airportCode;
    this.selectedSourceName = airport.airportName;
  }

  selectDestination(airport: AirlineResponse): void {
    this.selectedDestinationCode = airport.airportCode;
    this.selectedDestinationName = airport.airportName;
  }

  interchangeLocations(): void {
    const tempCode = this.selectedSourceCode;
    const tempName = this.selectedSourceName;
    this.selectedSourceCode = this.selectedDestinationCode;
    this.selectedSourceName = this.selectedDestinationName;
    this.selectedDestinationCode = tempCode;
    this.selectedDestinationName = tempName;
  }

  canSearch(): boolean {
    return (
      this.selectedSourceCode !== '' &&
      this.selectedDestinationCode !== '' &&
      this.selectedDate.trim() !== '' &&
      this.selectedSourceCode !== this.selectedDestinationCode
    );
  }

  searchFlights(): void {
    if (!this.canSearch()) return;

    this.searching = true;
    this.searchPerformed = true;

    this.flightService
      .getFlightsBySourceAndDestination(
        this.selectedSourceCode,
        this.selectedDestinationCode,
        this.selectedDate
      )
      .subscribe({
        next: (flights) => {
          this.flights = flights;
          this.processFlightData();
          this.searching = false;
        },
        error: (error) => {
          console.error('Error searching flights:', error);
          this.searching = false;
          this.flights = [];
          this.processFlightData();
        },
      });
  }

  private processFlightData(): void {
    this.maxPrice = Math.max(...this.flights.map((f) => f.price), 50000);
    this.priceFilter = this.maxPrice;

    const uniqueAirlineNames = [...new Set(this.flights.map(f => f.airline))];
    this.uniqueAirlines = uniqueAirlineNames.map((airlineName, index) => ({
      airportId: index + 1,
      airportName: airlineName,
      airportCode: airlineName.substring(0, 3).toUpperCase(),
      address: airlineName
    }));

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredFlights = this.flights.filter((flight) => {
      const priceMatch = flight.price <= this.priceFilter;
      const airlineMatch =
        this.selectedAirlines.length === 0 ||
        this.selectedAirlines.some(id => 
          this.uniqueAirlines.find(airline => 
            airline.airportId === id)?.airportName === flight.airline
        );

      return priceMatch && airlineMatch;
    });

    this.sortFlights();
  }

  toggleAirlineFilter(airlineId: number): void {
    const index = this.selectedAirlines.indexOf(airlineId);
    if (index > -1) {
      this.selectedAirlines.splice(index, 1);
    } else {
      this.selectedAirlines.push(airlineId);
    }
    this.applyFilters();
  }

  setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortFlights();
  }

  private sortFlights(): void {
    this.filteredFlights.sort((a, b) => {
      switch (this.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'time':
          return a.time.localeCompare(b.time);
        case 'date':
          return a.startDate.localeCompare(b.startDate);
        default:
          return 0;
      }
    });
  }

  getAirlineColor(airlineName: string): string {
    const colors: { [key: string]: string } = {
      'Air India': '#e74c3c',
      'IndiGo': '#3498db',
      'SpiceJet': '#f39c12',
      'Vistara': '#9b59b6',
      'GoAir': '#27ae60',
      'AirAsia': '#e67e22',
      'Delhi': '#e74c3c',
      'Mumbai': '#3498db',
      'Bangalore': '#f39c12',
      'Chennai': '#9b59b6',
      'Kolkata': '#27ae60',
      'Hyderabad': '#e67e22'
    };
    return colors[airlineName] || '#6c757d';
  }

  viewFlightDetails(flightData: FlightResponse): void {
    this.selectedFlight = flightData;
    console.log('Selected flight for booking:', this.selectedFlight);

    if (typeof window !== 'undefined') {
      const modalElement = document.getElementById('flightDetailsModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  proceedToBooking(flightData: FlightResponse): void {
    this.selectedFlight = flightData;

    if (typeof window !== 'undefined') {
      const modalElement = document.getElementById('flightDetailsModal');
      const modal = modalElement ? (window as any).bootstrap.Modal.getInstance(modalElement) : null;
      if (modal) modal.hide();
    }

    const flightToBook = { ...flightData };
    setTimeout(() => {
      this.router.navigate(['/book'], { state: { flight: flightToBook } });
    }, 100);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(time: string): string {
  if (!time) return '';
  
  // Attach today’s date with the time string
  const today = new Date().toISOString().split('T')[0]; 
  const dateObj = new Date(`${today}T${time}`);

  if (isNaN(dateObj.getTime())) return time; // fallback
  
  return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

}
