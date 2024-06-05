package com.demo.Repository;

import com.demo.entity.Strap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StrapDAO extends JpaRepository<Strap, UUID> {
}
