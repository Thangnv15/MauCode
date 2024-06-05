package com.demo.Repository;

import com.demo.entity.Shape;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShapeDAO extends JpaRepository<Shape, UUID> {
}
