package com.wipro.bookingms.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.wipro.bookingms.dto.response.PaymentResponseEvent;
import com.wipro.bookingms.entity.Booking;
import com.wipro.bookingms.enums.BookingStatus;
import com.wipro.bookingms.repository.BookingRepository;

@Service
public class BookingConsumer {

	@Autowired
    private BookingRepository bookingRepository;

    @KafkaListener(topics = "t-response")
    public void consumePaymentResponse(String message) {
        // Format: bookingId~status
        String[] parts = message.split("~");
        Long bookingId = Long.parseLong(parts[0]);
        String status = parts[1];

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        booking.setStatus(BookingStatus.valueOf(status));
        bookingRepository.save(booking);

        System.out.println("✅ Payment update received for bookingId=" + bookingId + ", status=" + status);
    }
}
