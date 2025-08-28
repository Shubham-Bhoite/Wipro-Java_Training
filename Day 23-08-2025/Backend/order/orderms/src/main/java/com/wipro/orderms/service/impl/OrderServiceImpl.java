package com.wipro.orderms.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import com.wipro.orderms.dto.Food;
import com.wipro.orderms.dto.Payment;
import com.wipro.orderms.entity.Order;
import com.wipro.orderms.entity.OrderItem;
import com.wipro.orderms.entity.OrderMaster;
import com.wipro.orderms.repo.OrderMasterRepo;
import com.wipro.orderms.repo.OrderRepo;
import com.wipro.orderms.service.OrderService;
import com.wipro.orderms.util.AppConstant;


@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	OrderRepo orderRepo;
	
	@Autowired
	OrderMasterRepo orderMasterRepo;
	
	@Autowired
	RestTemplate  restTemplate;
	
	@Autowired
	KafkaTemplate kafkaTemplate;

	@Override
	public List<Order> findAll() {
		// TODO Auto-generated method stub
		return orderRepo.findAll();
	}

	@Override
	public Order save(Order order, String token) {
		// TODO Auto-generated method stub
		// 1. Generate order id 
		List<OrderMaster> orderMaster = orderMasterRepo.findAll();
		String orderId = null;
		if(orderMaster!= null) {
			OrderMaster orderMasterData =orderMaster.get(orderMaster.size()-1);
			int value=orderMasterData.getValue()+1;
			String strValue=String.format("%04d", value);
		    orderId="ORD-"+strValue;
			System.out.println(orderId);
			orderMasterData.setValue(value);
			orderMasterRepo.save(orderMasterData);
		}
		
		order.setOrderTime(LocalDate.now());
		order.setOrderStatus("Pending");
		order.setOrderId(orderId);
		orderRepo.save(order);
		
		//  2 Make a call to food service
		double totalValue = 0.0;
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		for(OrderItem item: order.getItems()) {
			String url = "http://FoodMs/foods/" + item.getFoodId();
			HttpEntity<String> entity = new HttpEntity<>(headers);
			ResponseEntity<Food> response =
	                restTemplate.exchange(url, HttpMethod.GET, entity, Food.class);
			Food food = response.getBody();
			if(food!=null) {
				double value = food.getPrice() * item.getQuantity();
				totalValue += value;
			}
			
		}
		order.setOrderValue(totalValue);
		orderRepo.save(order);
		
		return order;

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
			extOrder.setItems(order.getItems());
			extOrder.setOrderId(order.getOrderId());
			extOrder.setOrderTime(order.getOrderTime());
			
			extOrder.setOrderValue(order.getOrderValue());
			orderRepo.save(extOrder);
			return new ResponseEntity<>("Order updated successfully", HttpStatus.OK);
			
		}
		else {
			return new ResponseEntity<>("Order id not found", HttpStatus.NO_CONTENT);
		}

	}

	@Override
	public void pay(Payment payment) {
		// TODO Auto-generated method stub
		kafkaTemplate.send(AppConstant.OUTGOING_TOPIC_NAME, payment);
		
		
	}

}