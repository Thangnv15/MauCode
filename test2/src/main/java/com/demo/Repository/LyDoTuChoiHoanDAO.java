package com.demo.Repository;

import com.demo.entity.LyDoTuChoiHoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LyDoTuChoiHoanDAO extends JpaRepository<LyDoTuChoiHoan, UUID> {
}
