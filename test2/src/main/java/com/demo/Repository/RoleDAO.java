package com.demo.Repository;

import com.demo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleDAO extends JpaRepository<Role, UUID> {
}
