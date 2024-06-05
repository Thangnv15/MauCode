package com.demo.Repository;

import com.demo.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FeatureDAO extends JpaRepository<Feature, UUID> {
}
