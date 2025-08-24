package com.wipro.food.service;


import java.util.List;

import com.wipro.food.entity.Food;

public interface FoodService {
	
	List<Food> findAll();
	void save(Food food);
	void delete(int id);
	Food findById(int id);
	void update(int id, Food food);
	

}
