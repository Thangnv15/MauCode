package com.demo.Repository;

import com.demo.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OriginDAO extends JpaRepository<Origin, UUID> {
}
