package com.wipro.bookingms.service;

import java.time.LocalDate;
import java.util.List;

import com.wipro.bookingms.dto.request.BookingRequest;
import com.wipro.bookingms.dto.request.PaymentRequest;
import com.wipro.bookingms.dto.response.BookingResponse;
import com.wipro.bookingms.dto.response.FlightResponse;

public interface BookingService {
    public BookingResponse createNewBooking(BookingRequest bookingRequest);
    
    List<FlightResponse> searchFlights(String source, String destination, LocalDate time);
    String cancelBooking(Long id);
    String doPayment(Long id, PaymentRequest paymentRequest);
    BookingResponse getBookingDetails(Long id);
    List<BookingResponse> getAllBookings();
}
