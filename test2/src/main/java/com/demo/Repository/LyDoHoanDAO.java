package com.demo.Repository;

import com.demo.entity.LyDoHoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LyDoHoanDAO extends JpaRepository<LyDoHoan, UUID> {
}
