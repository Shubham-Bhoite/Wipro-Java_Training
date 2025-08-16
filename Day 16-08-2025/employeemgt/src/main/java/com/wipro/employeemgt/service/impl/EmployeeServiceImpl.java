package com.wipro.employeemgt.service.impl;


import org.springframework.stereotype.Service;

import com.wipro.employeemgt.entity.Employee;
import com.wipro.employeemgt.repo.EmployeeRepository;
import com.wipro.employeemgt.service.EmployeeService;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeServiceImpl(EmployeeRepository repo) {
        this.repo = repo;
    }

    @Override
    public Employee addEmployee(Employee e) {
        return repo.save(e);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public List<Employee> searchEmployees(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }


    @Override
    public Employee updateEmployee(Long id, Employee e) {
        Employee existing = getEmployeeById(id);
        existing.setName(e.getName());
        existing.setType(e.getType());
        existing.setAddress(e.getAddress());
        existing.setDepartment(e.getDepartment());
        return repo.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }
}
