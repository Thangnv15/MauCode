package com.demo.Repository;

import com.demo.entity.MachineType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MachineTypeDAO extends JpaRepository<MachineType, UUID> {
}
