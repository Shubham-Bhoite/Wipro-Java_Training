package com.wipro.usermgmt.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.usermgmt.dto.Token;
import com.wipro.usermgmt.entity.User;
import com.wipro.usermgmt.service.UserService;




@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userServie;
	
	@GetMapping
	List<User> findAll()
	{
		return userServie.findAll();
	}
	@GetMapping("/{id}")
	User findById(@PathVariable int id)
	{
		return userServie.findById(id);
	}
	@DeleteMapping("/{id}")
	void deleteById(@PathVariable int id)
	{
		 userServie.deleteById(id);
	}
	@PostMapping
	void save(@RequestBody User user)
	{
		userServie.save(user);
		
	}
	
	@PutMapping
	void update(@RequestBody User user)
	{
		userServie.save(user);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
	    Token token = userServie.login(user);

	    if (token != null && token.getToken() != null) {
	        // ✅ Successful login
	        return ResponseEntity.ok(token);
	    } else {
	        // ❌ Wrong email/password
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body(Map.of("error", "Invalid username or password"));
	    }
	}


}