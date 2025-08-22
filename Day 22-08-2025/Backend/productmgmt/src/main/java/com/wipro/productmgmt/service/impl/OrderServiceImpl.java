package com.wipro.productmgmt.service.impl;

import com.wipro.productmgmt.entity.Order;
import com.wipro.productmgmt.entity.Product;
import com.wipro.productmgmt.repo.OrderRepo;
import com.wipro.productmgmt.repo.ProductRepo;
import com.wipro.productmgmt.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public Order placeOrder(int productId, int qty) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        int available = product.getQty() == null ? 0 : product.getQty();
        if (qty <= 0) {
            throw new RuntimeException("Purchase quantity must be greater than 0");
        }
        if (qty > available) {
            throw new RuntimeException("Not enough stock available");
        }

        // reduce qty and save
        product.setQty(available - qty);
        productRepo.save(product);

        // create order
        Order order = new Order();
        order.setProduct(product);
        order.setQty(qty);
        order.setOrderDate(LocalDateTime.now());

        return orderRepo.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
