package com.wipro.food.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.food.entity.Food;

public interface FoodRepo extends JpaRepository<Food, Integer>{


}