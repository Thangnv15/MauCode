package com.demo.Repository;

import com.demo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PayDAO extends JpaRepository<Payment, UUID> {
}
