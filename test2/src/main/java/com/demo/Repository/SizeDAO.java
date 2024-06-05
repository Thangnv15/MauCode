package com.demo.Repository;

import com.demo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SizeDAO extends JpaRepository<Size, UUID> {
}
