package com.demo.Repository;

import com.demo.entity.GlassMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GlassMaterialDAO extends JpaRepository<GlassMaterial, UUID> {
}
