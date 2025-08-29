package com.wipro.flightms.service;

import com.wipro.flightms.dto.response.AirlineResponse;
import com.wipro.flightms.dto.response.FlightResponse;

import java.time.LocalDate;
import java.util.List;

public interface FlightService {
    public List<FlightResponse> getAllFlights();
    public List<FlightResponse> getFlightsBySourceAndDestination(String source, String destination, LocalDate time);
    public FlightResponse getFlightById(Long id);
    public List<AirlineResponse> getAllAirlines();
}
