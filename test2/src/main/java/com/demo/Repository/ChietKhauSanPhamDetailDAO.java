package com.demo.Repository;

import com.demo.entity.ChietKhauSanPhamDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChietKhauSanPhamDetailDAO extends JpaRepository<ChietKhauSanPhamDetail, UUID> {
}
