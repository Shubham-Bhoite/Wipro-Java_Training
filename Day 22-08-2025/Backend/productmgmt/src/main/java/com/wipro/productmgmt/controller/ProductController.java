package com.wipro.productmgmt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wipro.productmgmt.entity.Product;
import com.wipro.productmgmt.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping
    List<Product> findAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    Product findById(@PathVariable int id) {
        return productService.findById(id);
    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable int id) {
        productService.deleteById(id);
    }

    @PostMapping
    void save(@RequestBody Product product) {
        productService.save(product);
    }

    @PutMapping
    void update(@RequestBody Product product) {
        productService.save(product);
    }
}
