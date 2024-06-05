package com.demo.Repository;

import com.demo.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, UUID> {
}
