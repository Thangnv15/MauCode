package com.demo.Repository;

import com.demo.entity.ChietKhauSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChietKhauDAO extends JpaRepository<ChietKhauSanPham,UUID > {
}
