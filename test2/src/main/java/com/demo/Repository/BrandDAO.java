package com.demo.Repository;

import com.demo.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BrandDAO extends JpaRepository<Brand, UUID> {
}
