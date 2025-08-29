package com.wipro.flightms.service.impl;

import com.wipro.flightms.dto.response.AirlineResponse;
import com.wipro.flightms.dto.response.FlightResponse;
import com.wipro.flightms.entity.Airport;
import com.wipro.flightms.entity.Flight;
import com.wipro.flightms.repository.AirportRepository;
import com.wipro.flightms.repository.FlightRepository;
import com.wipro.flightms.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AirportRepository airportRepository;

    @Override
    public List<FlightResponse> getAllFlights() {
      List<Flight> flights= flightRepository.findAll();
        return flights.stream()
                .map(f -> new FlightResponse(
                        f.getFlightId(),
                        f.getFlightName(),
                        f.getFlightNumber(),
                        f.getAirline(),
                        f.getSource().getAirportCode(),
                        f.getDestination().getAirportCode(),
                        f.getStartDate(),
                        f.getEndDate(),
                        f.getPrice(),
                        f.getTime()
                ))
                .toList();
    }

    @Override
    public List<FlightResponse> getFlightsBySourceAndDestination(String source, String destination, LocalDate time) {

            List<Flight> flights = flightRepository.findFlights(source, destination, time);
            return flights.stream()
                    .map(f -> new FlightResponse(
                            f.getFlightId(),
                            f.getFlightName(),
                            f.getFlightNumber(),
                            f.getAirline(),
                            f.getSource().getAirportCode(),
                            f.getDestination().getAirportCode(),
                            f.getStartDate(),
                            f.getEndDate(),
                            f.getPrice(),
                            f.getTime()
                    ))
                    .toList();
    }

    @Override
    public FlightResponse getFlightById(Long id) {
        Flight f= flightRepository.findById(id).orElseThrow(()->new RuntimeException("Flight Not Found"));
        return  new FlightResponse(
                f.getFlightId(),
                f.getFlightName(),
                f.getFlightNumber(),
                f.getAirline(),
                f.getSource().getAirportCode(),
                f.getDestination().getAirportCode(),
                f.getStartDate(),
                f.getEndDate(),
                f.getPrice(),
                f.getTime()
        );
    }

    @Override
    public List<AirlineResponse> getAllAirlines() {
        List<Airport> airportList=airportRepository.findAll();
        return airportList.stream()
                .map(a->new AirlineResponse(a.getAirportId(),a.getAirportName(),a.getAirportCode(),a.getAddress())
                ).toList();
    }
}
