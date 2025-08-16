package com.wipro.employeemgt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.employeemgt.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    List<Employee> findByNameContainingIgnoreCase(String name);


}
