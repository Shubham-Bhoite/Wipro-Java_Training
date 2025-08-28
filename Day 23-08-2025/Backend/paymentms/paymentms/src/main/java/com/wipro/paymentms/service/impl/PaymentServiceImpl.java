package com.wipro.paymentms.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.paymentms.entity.Payment;
import com.wipro.paymentms.repo.PaymentRepo;
import com.wipro.paymentms.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	PaymentRepo paymentRepo;

	@Override
	public List<Payment> findAll() {
		// TODO Auto-generated method stub
		return paymentRepo.findAll();
	}

	@Override
	public Payment findById(int id) {
		// TODO Auto-generated method stub
		Optional<Payment> existingPayment = paymentRepo.findById(id);
		if(existingPayment.isPresent()) {
			return existingPayment.get();
		}
		return null;
	}

	@Override
	public Payment save(Payment payment) {
		// TODO Auto-generated method stub
		return payment;
	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		paymentRepo.deleteById(id);
		
	}

}