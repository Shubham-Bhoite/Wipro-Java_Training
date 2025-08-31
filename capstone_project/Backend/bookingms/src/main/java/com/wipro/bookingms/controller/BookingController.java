package com.wipro.bookingms.controller;

import com.wipro.bookingms.dto.request.BookingRequest;
import com.wipro.bookingms.dto.request.PaymentRequest;
import com.wipro.bookingms.dto.response.BookingResponse;
import com.wipro.bookingms.dto.response.FlightResponse;
import com.wipro.bookingms.service.BookingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking/api")
@Tag(name = "Booking Microservices API", description = "To perform booking related operations")

public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "This method is used to create a booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Booking created!!")
    })
    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createNewBooking(@RequestBody BookingRequest request){
        return ResponseEntity.ok(bookingService.createNewBooking(request));
    }

    @GetMapping("/search")
    public ResponseEntity<List<FlightResponse>> searchFlights(@RequestParam String source, @RequestParam String destination, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return ResponseEntity.ok(bookingService.searchFlights(source,destination,date));
    }

    @PutMapping("/booking/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id){
        return  ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @Operation(summary = "This method is used to make payment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Make payment")
    })
    @PostMapping("/booking/{id}/pay")
    public ResponseEntity<String> doPayment(@PathVariable Long id, @RequestBody PaymentRequest paymentRequest){
         return ResponseEntity.ok(bookingService.doPayment(id,paymentRequest));
    }

    @GetMapping("booking/{id}")
    public ResponseEntity<BookingResponse> getBookingDetails(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.getBookingDetails(id));
    }

    @GetMapping("bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
