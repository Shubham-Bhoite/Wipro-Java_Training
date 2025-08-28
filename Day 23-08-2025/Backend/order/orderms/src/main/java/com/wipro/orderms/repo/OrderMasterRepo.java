package com.wipro.orderms.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.orderms.entity.OrderMaster;

public interface OrderMasterRepo extends JpaRepository<OrderMaster, Integer> {

}