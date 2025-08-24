package com.wipro.food.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.food.entity.Food;
import com.wipro.food.service.FoodService;

@RestController
@RequestMapping("/foods")
public class FoodController {
	
	@Autowired
	FoodService foodService;
	
	@PostMapping
	void save(@RequestBody Food food) {
		foodService.save(food);
	}
	
	@GetMapping
	List<Food> findAll(){
		
		return foodService.findAll();
	}
	
	@GetMapping("/{id}")
	Food findById(@PathVariable int id) {
		return foodService.findById(id);
		
	}
	
	@PutMapping("/{id}")
	void update(@PathVariable int id, @RequestBody Food food) {
		
		foodService.update(id, food);
		
	}
	
	@DeleteMapping("/{id}")
	void delete(@PathVariable int id) {
		foodService.delete(id);
	}

}
