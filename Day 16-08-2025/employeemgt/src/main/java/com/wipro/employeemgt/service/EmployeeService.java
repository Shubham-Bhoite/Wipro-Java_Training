package com.wipro.employeemgt.service;

import java.util.List;

import com.wipro.employeemgt.entity.Employee;

public interface EmployeeService {
	
	Employee addEmployee(Employee e);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    List<Employee> searchEmployees(String name);   
    Employee updateEmployee(Long id, Employee e);
    void deleteEmployee(Long id);

}
