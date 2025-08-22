package com.wipro.productmgmt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int qty;

    private LocalDateTime orderDate;

    // ---- transient/computed properties for FE ----
    @Transient
    @JsonProperty("productName")
    public String getProductName() {
        return product != null ? product.getName() : null;
    }

    @Transient
    @JsonProperty("qtyPurchased")
    public int getQtyPurchased() {
        return qty;
    }
    // ----------------------------------------------

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}
