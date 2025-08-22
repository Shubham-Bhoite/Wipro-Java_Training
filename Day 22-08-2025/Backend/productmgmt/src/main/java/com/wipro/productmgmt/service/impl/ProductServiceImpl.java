package com.wipro.productmgmt.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.productmgmt.entity.Product;
import com.wipro.productmgmt.repo.ProductRepo;
import com.wipro.productmgmt.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepo productRepo;
	
	@Override
	public List<Product> findAll() {
		return productRepo.findAll();
	}

	@Override
	public Product findById(int id) {
		Optional<Product> productOpt= productRepo.findById(id);
		if(productOpt.isPresent())
		{
			return productOpt.get();
		}
		return null;
	}

	@Override
	public void save(Product product) {
		productRepo.save(product);
	}

	@Override
	public void deleteById(int id) {
		productRepo.deleteById(id);
	}

}