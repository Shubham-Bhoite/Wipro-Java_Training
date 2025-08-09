package com.wipro.demo.firstboot.repo;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class CitiRepo {
	
	public List<String> getCitiList()
	{
		
		return Arrays.asList("Pune","Ahmadnagar","Mumbai","Satara");
	}

}
