package com.wipro.productmgmt.service;


import java.util.List;
import com.wipro.productmgmt.entity.Order;

public interface OrderService {
    Order placeOrder(int productId, int qty);
    List<Order> getAllOrders();
}
