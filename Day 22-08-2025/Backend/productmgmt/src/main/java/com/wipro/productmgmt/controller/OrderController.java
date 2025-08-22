package com.wipro.productmgmt.controller;


import com.wipro.productmgmt.entity.Order;
import com.wipro.productmgmt.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // place order
    @PostMapping("/place")
    public Order placeOrder(@RequestBody Map<String, Integer> request) {
        int productId = request.get("productId");
        int qty = request.get("qty");
        return orderService.placeOrder(productId, qty);
    }

    // order history
    @GetMapping("/history")
    public List<Order> getOrders() {
        return orderService.getAllOrders();
    }
}

