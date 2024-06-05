package com.demo.Repository;

import com.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderDAO extends JpaRepository<Order, UUID> {
}
