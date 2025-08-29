package com.wipro.flightms.controller;

import com.wipro.flightms.dto.response.AirlineResponse;
import com.wipro.flightms.dto.response.FlightResponse;
import com.wipro.flightms.service.FlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/flight-ms/api")
@Tag(name = "Flight Microservices API", description = "To perform flight related operations")

public class FlightController {

    private FlightService flightService;


    @Operation(summary = "This method is used to get all available flights")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All flights fetched success")
    })
    @GetMapping("/all-flights")
    public ResponseEntity<List<FlightResponse>> getAllFlights(){
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/get-flights")
    public ResponseEntity<List<FlightResponse>> getFlightsBySourceAndDestination(@RequestParam String source, @RequestParam String destination, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return ResponseEntity.ok(flightService.getFlightsBySourceAndDestination(source,destination,date));
    }

    @Operation(summary = "This method is used to get a specific flight")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Specific flight fetched success")
    })
    @GetMapping("/flights/{id}")
    public ResponseEntity<FlightResponse> getFlightById(@PathVariable Long id){
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @GetMapping("/airlines")
    public ResponseEntity<List<AirlineResponse>> getAllAirLines(){
        return ResponseEntity.ok(flightService.getAllAirlines());
    }
}
