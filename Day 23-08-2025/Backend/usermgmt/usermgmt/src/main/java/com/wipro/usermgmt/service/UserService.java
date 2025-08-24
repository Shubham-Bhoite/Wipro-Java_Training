package com.wipro.usermgmt.service;

import java.util.List;

import com.wipro.usermgmt.dto.Token;
import com.wipro.usermgmt.entity.User;



public interface UserService {
	
	List<User> findAll();
	User findById(int id);
	void save(User user);
	void deleteById(int id);
	Token login(User user);

}