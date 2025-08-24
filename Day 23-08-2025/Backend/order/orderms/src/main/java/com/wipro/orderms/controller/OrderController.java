package com.wipro.orderms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.orderms.entity.Order;
import com.wipro.orderms.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	OrderService orderService;
	
	
	@PostMapping
	public ResponseEntity<String> save(@RequestBody Order order){
		
		return orderService.save(order);
		
	}
	
	@GetMapping
	public List<Order> findAll(){
		return orderService.findAll();
	}
	
	@GetMapping("/{id}")
	public Order findById(@PathVariable int id) {
		return orderService.findById(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable int id, @RequestBody Order order){
		return orderService.update(id, order);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable int id){
		return orderService.delete(id);
	}

}