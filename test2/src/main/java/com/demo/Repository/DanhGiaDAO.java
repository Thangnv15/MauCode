package com.demo.Repository;

import com.demo.entity.DanhGia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DanhGiaDAO extends JpaRepository<DanhGia, UUID> {
}
