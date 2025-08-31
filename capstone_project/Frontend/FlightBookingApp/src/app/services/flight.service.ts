import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FlightResponse,
  AirlineResponse,
  FlightSearchRequest
} from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:9191/flight-ms/api'; 

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<FlightResponse[]> {
    return this.http.get<FlightResponse[]>(`${this.apiUrl}/all-flights`);
  }

  getFlightsBySourceAndDestination(
    sourceCode: string,
    destinationCode: string,
    date: string
  ): Observable<FlightResponse[]> {
    const params = new HttpParams()
      .set('source', sourceCode)
      .set('destination', destinationCode)
      .set('date', date);

    return this.http.get<FlightResponse[]>(`${this.apiUrl}/get-flights`, {
      params,
    });
  }

  getFlightById(id: number): Observable<FlightResponse> {
    return this.http.get<FlightResponse>(`${this.apiUrl}/flights/${id}`);
  }

  getAllAirlines(): Observable<AirlineResponse[]> {
    return this.http.get<AirlineResponse[]>(`${this.apiUrl}/airlines`);
  }

}
