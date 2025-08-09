package com.wipro.demo.firstboot.repo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wipro.demo.firstboot.service.CitiService;


@Controller
@RequestMapping("/citi")
public class CitiController {
	
	@Autowired
	CitiService citiService;
	
	@GetMapping("/list")
	String getCitiList(Model m)
	{
		
		m.addAttribute("citilist", citiService.getCitiList());
		return "citilist";
	}

}

