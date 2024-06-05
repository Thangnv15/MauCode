package com.demo.Repository;

import com.demo.entity.ThongBaoAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ThongBaoAdminDAO extends JpaRepository<ThongBaoAdmin, UUID> {
}
