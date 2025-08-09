package com.wipro.demo.firstboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.wipro.demo.firstboot.User;

@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping("/register")
    public String showForm() {
        return "userreg"; 
    }

    @PostMapping("/save")
    public String handleForm(@ModelAttribute User user) {
        System.out.println("User Name: " + user.getUsername());
        System.out.println("User Email: " + user.getUserEmail());
        System.out.println("User Phone: " + user.getUserPhone());
        return "success"; 
    }
}

