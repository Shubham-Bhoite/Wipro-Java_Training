package com.wipro.orderms.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "order_details")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@Column(name = "order_id")
	String orderId;
	
	@Column(name = "order_value")
	double orderValue;
	
	@Column(name = "user_id")
	int userId;
	
	@Column(name = "order_time")
	LocalDate orderTime;
	
	@Column(name = "order_status")
	String orderStatus;
	
	
	
	 public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getOrderId() {
		return orderId;
	}



	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}



	public double getOrderValue() {
		return orderValue;
	}



	public void setOrderValue(double orderValue) {
		this.orderValue = orderValue;
	}



	public int getUserId() {
		return userId;
	}



	public void setUserId(int userId) {
		this.userId = userId;
	}



	public LocalDate getOrderTime() {
		return orderTime;
	}



	public void setOrderTime(LocalDate orderTime) {
		this.orderTime = orderTime;
	}



	public String getOrderStatus() {
		return orderStatus;
	}



	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}



	public List<OrderItem> getItems() {
		return items;
	}



	public void setItems(List<OrderItem> items) {
		this.items = items;
	}



	@ElementCollection
	    @CollectionTable(
	        name = "order_foods",
	        joinColumns = @JoinColumn(name = "order_id")
	    )
	    private List<OrderItem> items;

}