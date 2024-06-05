package com.demo.Repository;

import com.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductDAO extends JpaRepository<Product, UUID> {
}
