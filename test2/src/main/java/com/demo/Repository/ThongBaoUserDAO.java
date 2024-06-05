package com.demo.Repository;

import com.demo.entity.ThongBaoUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ThongBaoUserDAO extends JpaRepository<ThongBaoUser, UUID> {
}
