package com.wipro.food.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.food.entity.Food;
import com.wipro.food.repo.FoodRepo;
import com.wipro.food.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {
	
	@Autowired
	FoodRepo foodRepo;

	@Override
	public List<Food> findAll() {
		// TODO Auto-generated method stub
		return foodRepo.findAll();
	}

	@Override
	public void save(Food food) {
		// TODO Auto-generated method stub
		
		foodRepo.save(food);
		
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		foodRepo.deleteById(id);
		
	}

	@Override
	public Food findById(int id) {
		// TODO Auto-generated method stub
		Food existingFood = foodRepo.findById(id).get();
		return existingFood;
	}

	@Override
	public void update(int id, Food food) {
		// TODO Auto-generated method stub
		Food existingFood = foodRepo.findById(id).get();
		if(existingFood.getId() == food.getId()) {
			existingFood.setDescription(food.getDescription());
			existingFood.setFoodName(food.getFoodName());
			existingFood.setImage(food.getImage());
			existingFood.setPrice(food.getPrice());
		}
		
	}

}