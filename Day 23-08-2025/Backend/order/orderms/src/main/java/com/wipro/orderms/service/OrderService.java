package com.wipro.orderms.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wipro.orderms.entity.Order;

public interface OrderService {
	
	List<Order> findAll();
	ResponseEntity<String> save(Order order);
	Order findById(int id);
	ResponseEntity<String> delete(int id);
	ResponseEntity<String> update(int id, Order order);
	

}