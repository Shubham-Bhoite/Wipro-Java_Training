package com.wipro.orderms.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wipro.orderms.entity.Order;
import com.wipro.orderms.repo.OrderRepo;
import com.wipro.orderms.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	OrderRepo orderRepo;

	@Override
	public List<Order> findAll() {
		// TODO Auto-generated method stub
		return orderRepo.findAll();
	}

	@Override
	public ResponseEntity<String> save(Order order) {
		// TODO Auto-generated method stub
		order.setOrderTime(LocalDate.now());
		orderRepo.save(order);
		return new ResponseEntity<>("Order saved successfully", HttpStatus.OK);

	}

	@Override
	public Order findById(int id) {
		// TODO Auto-generated method stub
		Optional<Order> extOrder = orderRepo.findById(id);
		return extOrder.get();
	}

	@Override
	public ResponseEntity<String> delete(int id) {
		// TODO Auto-generated method stub
		
		if(orderRepo.findById(id).isPresent()) {
			orderRepo.deleteById(id);
			return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);	
		}
		else {
			return new ResponseEntity<>("Order not Found", HttpStatus.NO_CONTENT);
		}
		

	}

	@Override
	public ResponseEntity<String> update(int id, Order order) {
		// TODO Auto-generated method stub
		
		Order extOrder = orderRepo.findById(id).get();
		
		if(extOrder.getId() == order.getId()) {
			extOrder.setFoodId(order.getFoodId());
			extOrder.setItemName(order.getItemName());
			extOrder.setOrderTime(order.getOrderTime());
			extOrder.setQuantity(order.getQuantity());
			extOrder.setOrderValue(order.getOrderValue());
			orderRepo.save(extOrder);
			return new ResponseEntity<>("Order updated successfully", HttpStatus.OK);
			
		}
		else {
			return new ResponseEntity<>("Order id not found", HttpStatus.NO_CONTENT);
		}

	}

}