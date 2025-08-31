import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, AfterViewInit {
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

  priceFilter: number = 50000;
  maxPrice: number = 50000;
  selectedAirlines: number[] = [];
  sortBy: string = 'price';

  selectedFlight: FlightResponse | null = null;

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.selectedDate = this.minDate;
  }

  ngOnInit(): void {
    this.loadAirlines();
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modalElement => {
          if (modalElement instanceof HTMLElement) {
            console.log('Initializing modal:', modalElement.id);
          }
        });
      }, 100);
    }
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
    // Calculate max price for filter
    this.maxPrice = Math.max(...this.flights.map((f) => f.price), 50000);
    this.priceFilter = this.maxPrice;

    // Get unique airlines
    const uniqueAirlineNames = [...new Set(this.flights.map(f => f.airline))];
    this.uniqueAirlines = uniqueAirlineNames.map((airlineName, index) => ({
      airportId: index + 1,
      airportName: airlineName,
      airportCode: airlineName.substring(0, 3).toUpperCase(),
      address: airlineName
    }));

    // Apply filters and sort
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

    // Use setTimeout to ensure the modal is rendered before trying to show it
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const modalElement = document.getElementById('flightDetailsModal');
        console.log('Modal element found:', modalElement);
        if (modalElement) {
          try {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
            console.log('Modal shown successfully');
          } catch (error) {
            console.error('Error showing modal:', error);
          }
        } else {
          console.error('Modal element not found');
        }
      }
    }, 100);
  }

  proceedToBooking(flightData: FlightResponse): void {
    console.log('proceedToBooking called with:', flightData);
    this.selectedFlight = flightData;
    
    // Close modal if it exists
    if (typeof window !== 'undefined') {
      const modalElement = document.getElementById('flightDetailsModal');
      const modal = modalElement ? (window as any).bootstrap.Modal.getInstance(modalElement) : null;
      if (modal) {
        modal.hide();
      }
    }

    // Ensure all data is properly structured before navigation
    const flightToBook = {
      flightId: flightData.flightId,
      flightName: flightData.flightName,
      flightNumber: flightData.flightNumber,
      airline: flightData.airline,
      source: flightData.source,
      destination: flightData.destination,
      startDate: flightData.startDate,
      endDate: flightData.endDate,
      price: flightData.price,
      time: flightData.time
    };

    console.log('Proceeding to booking with flight:', flightToBook);
    
    try {
      // Navigate with query parameters as fallback
      this.router.navigate(['/book'], {
        state: { flight: flightToBook },
        queryParams: { 
          flightId: flightToBook.flightId,
          source: flightToBook.source,
          destination: flightToBook.destination
        }
      });
      console.log('Navigation initiated successfully');
    } catch (error) {
      console.error('Navigation error:', error);
    }
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
    return time || 'N/A';
  }

  debugBooking(): void {
    console.log('Debug button clicked');
    console.log('Selected flight:', this.selectedFlight);
    console.log('Current route:', this.router.url);
    
    if (this.selectedFlight) {
      this.proceedToBooking(this.selectedFlight);
    } else {
      console.error('No flight selected');
    }
  }
}