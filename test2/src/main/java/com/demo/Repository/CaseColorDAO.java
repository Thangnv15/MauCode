package com.demo.Repository;

import com.demo.entity.CaseColor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CaseColorDAO extends JpaRepository<CaseColor, UUID> {
}
