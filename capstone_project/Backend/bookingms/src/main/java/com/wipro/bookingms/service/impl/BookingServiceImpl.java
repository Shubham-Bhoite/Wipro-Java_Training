package com.wipro.bookingms.service.impl;

import com.wipro.bookingms.dto.request.BookingRequest;
import com.wipro.bookingms.dto.request.PaymentEvent;
import com.wipro.bookingms.dto.request.PaymentRequest;
import com.wipro.bookingms.dto.response.BookingResponse;
import com.wipro.bookingms.dto.response.FlightResponse;
import com.wipro.bookingms.entity.Booking;
import com.wipro.bookingms.enums.BookingStatus;
import com.wipro.bookingms.kafka.BookingProducer;
import com.wipro.bookingms.repository.BookingRepository;
import com.wipro.bookingms.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BookingProducer bookingProducer;

    private static final String FLIGHT_SERVICE_URI = "http://localhost:9191/flight-ms/api";

    @Override
    public BookingResponse createNewBooking(BookingRequest bookingRequest) {
        FlightResponse flightResponse = restTemplate.getForObject(
                FLIGHT_SERVICE_URI + "/flights/" + bookingRequest.getFlightId(),
                FlightResponse.class
        );

        Booking booking = new Booking();
        booking.setFlightId(bookingRequest.getFlightId());
        booking.setPassengerName(bookingRequest.getPassengerName());
        booking.setPassengerEmail(bookingRequest.getPassengerEmail());
        booking.setStatus(BookingStatus.INITIATED);

        bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();
        response.setBookingId(booking.getBookingId());
        response.setFlightId(booking.getFlightId());
        response.setPassengerName(booking.getPassengerName());
        response.setPassengerEmail(booking.getPassengerEmail());
        response.setStatus(booking.getStatus().name());
        response.setFlightDetails(flightResponse);

        return response;
    }

    @Override
    public List<FlightResponse> searchFlights(String source, String destination, LocalDate time) {
        String url = FLIGHT_SERVICE_URI + "/get-flights?source={source}&destination={destination}&date={date}";
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<FlightResponse>>() {},
                source,
                destination,
                time
        ).getBody();
    }

    @Override
    public String cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not available !!!"));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        return "Booking Cancelled";
    }

    @Override
    public String doPayment(Long id, PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not available !!!"));

        // Send string message instead of DTO
        bookingProducer.sendPaymentRequest(
                booking.getBookingId(),
                paymentRequest.getAmount(),
                paymentRequest.getPaymentMode()
        );

        return "Payment initiated for bookingId=" + booking.getBookingId();
    }

    @Override
    public BookingResponse getBookingDetails(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not available !!!"));

        BookingResponse response = new BookingResponse();
        response.setBookingId(booking.getBookingId());
        response.setFlightId(booking.getFlightId());
        response.setPassengerName(booking.getPassengerName());
        response.setPassengerEmail(booking.getPassengerEmail());
        response.setStatus(booking.getStatus().name());

        return response;
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream().map(b -> {
            BookingResponse response = new BookingResponse();
            response.setBookingId(b.getBookingId());
            response.setFlightId(b.getFlightId());
            response.setPassengerName(b.getPassengerName());
            response.setPassengerEmail(b.getPassengerEmail());
            response.setStatus(b.getStatus().name());
            response.setFlightDetails(getFlightDetails(b.getFlightId()));
            return response;
        }).collect(Collectors.toList());
    }
    
    private FlightResponse getFlightDetails(Long id) {
    	FlightResponse flightResponse = restTemplate.getForObject(
                FLIGHT_SERVICE_URI + "/flights/" + id,
                FlightResponse.class
        );
    	return flightResponse;
    }
}
