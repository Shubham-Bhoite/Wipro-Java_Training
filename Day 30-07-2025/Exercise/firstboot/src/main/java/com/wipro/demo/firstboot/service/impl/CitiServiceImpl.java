package com.wipro.demo.firstboot.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.demo.firstboot.repo.CitiRepo;
import com.wipro.demo.firstboot.service.CitiService;


@Service
public class CitiServiceImpl implements CitiService {

	@Autowired
	CitiRepo citiRepo;
	
	@Override
	public List<String> getCitiList() {
		// TODO Auto-generated method stub
		return citiRepo.getCitiList();
	}
	
	

}