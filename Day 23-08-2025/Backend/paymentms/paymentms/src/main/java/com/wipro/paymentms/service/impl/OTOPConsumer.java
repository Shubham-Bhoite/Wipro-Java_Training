package com.wipro.paymentms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.wipro.paymentms.entity.Payment;
import com.wipro.paymentms.repo.PaymentRepo;
import com.wipro.paymentms.util.AppConstant;

@Service
public class OTOPConsumer {
	
	@Autowired
	PaymentRepo paymentRpo;
	
	@Autowired
	KafkaTemplate kafkaTemplate;
	
	@KafkaListener(topics=AppConstant.INCOMING_TOPIC_NAME,groupId="payment_service")
	public void receiveUpiPayment(Payment payment) {
		System.out.println("---Message Received ---"+payment);
		payment.setPaymentStatus("Successfull");
		paymentRpo.save(payment);
		kafkaTemplate.send(AppConstant.OUTGOING_TOPIC_NAME,payment);
		
	}
	
	

}