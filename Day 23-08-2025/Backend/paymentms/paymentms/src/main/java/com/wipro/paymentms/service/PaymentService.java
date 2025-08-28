package com.wipro.paymentms.service;
import java.util.List;



import com.wipro.paymentms.entity.Payment;


public interface PaymentService {
	List<Payment> findAll();
	Payment findById(int id);
	Payment save(Payment payment);
	void deleteById(int id);

}