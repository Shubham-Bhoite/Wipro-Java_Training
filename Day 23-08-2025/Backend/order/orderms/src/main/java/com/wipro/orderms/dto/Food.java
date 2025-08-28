package com.wipro.orderms.dto;

import lombok.Data;

@Data
public class Food {
	int id;
	double price;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	

}