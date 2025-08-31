package com.wipro.bookingms.kafka;

import com.wipro.bookingms.dto.request.PaymentEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookingProducer {


    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "t-request";

    // Send payment request as a string: bookingId~amount~paymentMode
    public void sendPaymentRequest(Long bookingId, Double amount, String paymentMode) {
        String message = bookingId + "~" + amount + "~" + paymentMode;
        kafkaTemplate.send(TOPIC, message);
        System.out.println("✅ Sent PaymentRequest: " + message);
    }
}
