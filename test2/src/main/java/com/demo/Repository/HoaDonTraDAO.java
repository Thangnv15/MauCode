package com.demo.Repository;

import com.demo.entity.HoaDonTra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HoaDonTraDAO extends JpaRepository<HoaDonTra, UUID> {
}
