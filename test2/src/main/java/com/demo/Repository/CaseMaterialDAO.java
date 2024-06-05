package com.demo.Repository;

import com.demo.entity.CaseMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CaseMaterialDAO extends JpaRepository<CaseMaterial, UUID> {
}
