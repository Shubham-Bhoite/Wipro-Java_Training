export interface FlightResponse {
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
}

export interface AirlineResponse {
  airportId: number;
  airportName: string;
  airportCode: string;
  address: string;
}

export interface FlightSearchRequest {
  source: string;
  destination: string;
  date: string;
}
