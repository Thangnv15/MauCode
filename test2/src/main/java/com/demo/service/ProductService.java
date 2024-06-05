package com.demo.service;

import com.demo.Repository.ProductDAO;
import com.demo.entity.Brand;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductDAO productDAO;

    public List<Product> getAll(){
        return productDAO.findAll();
    };

    public Product add(Product product){
        return productDAO.save(product);
    }
    public Product update(Product product){
        return productDAO.save(product);
    }

    public Product addExcel(String product){
        Product brand = new Product();
        brand.setName(product);
        return productDAO.save(brand);
    }
}
