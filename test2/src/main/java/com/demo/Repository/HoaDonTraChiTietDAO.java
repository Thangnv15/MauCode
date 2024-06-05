package com.demo.Repository;

import com.demo.entity.HoaDonTraChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HoaDonTraChiTietDAO extends JpaRepository<HoaDonTraChiTiet, UUID> {
}
