package com.wipro.paymentms.service.impl;

import java.sql.Timestamp;
import java.util.UUID;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.wipro.paymentms.dto.PaymentEvent;
import com.wipro.paymentms.dto.PaymentResponseEvent;
import com.wipro.paymentms.entity.Payment;
import com.wipro.paymentms.repository.PaymentRepository;
import com.wipro.paymentms.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(KafkaTemplate<String, String> kafkaTemplate,
                              PaymentRepository paymentRepository) {
        this.kafkaTemplate = kafkaTemplate;
        this.paymentRepository = paymentRepository;
    }

    @KafkaListener(topics = "t-request")
    public void processPayment(String message) {
        // Format: bookingId~amount~paymentMode
        String[] parts = message.split("~");
        Long bookingId = Long.parseLong(parts[0]);
        Double amount = Double.parseDouble(parts[1]);
        String paymentMode = parts[2];

        String status = paymentMode.equalsIgnoreCase("CARD") ? "SUCCESSFUL" : "FAILED";

        Payment payment = new Payment();
        payment.setBookingId(bookingId);
        payment.setAmount(amount);
        payment.setStatus(status);
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaymentTime(new Timestamp(System.currentTimeMillis()));
        paymentRepository.save(payment);

        // Send response as string: bookingId~status
        kafkaTemplate.send("t-response", bookingId + "~" + status);
        System.out.println("✅ Sent PaymentResponse: " + bookingId + "~" + status);
    }
}

