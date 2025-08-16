package com.wipro.employeemgt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.wipro.employeemgt.entity.Employee;
import com.wipro.employeemgt.service.EmployeeService;


@Controller
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/view")
    public String viewAll(Model model) {
        model.addAttribute("employees", service.getAllEmployees());
        return "employees"; 
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employee", new Employee());
        return "employeeForm"; 
    }

    @PostMapping("/save")
    public String saveEmployee(@ModelAttribute Employee employee) {
        service.addEmployee(employee);
        return "redirect:/employees/view";
    }
    
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        Employee employee = service.getEmployeeById(id);
        model.addAttribute("employee", employee);
        return "employeeForm"; 
    }

    @PostMapping("/update/{id}")
    public String updateEmployee(@PathVariable Long id, @ModelAttribute Employee employee) {
        service.updateEmployee(id, employee);
        return "redirect:/employees/view";
    }
    @GetMapping("/search")
    public String searchEmployees(@RequestParam("keyword") String keyword, Model model) {
        model.addAttribute("employees", service.searchEmployees(keyword));
        return "employees"; 
    }


    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteEmployee(id);
        return "redirect:/employees/view";
    }
}