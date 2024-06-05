package com.demo.Repository;

import com.demo.entity.PhuongThucHoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PhuongThucHoanDAO extends JpaRepository<PhuongThucHoan, UUID> {
}
