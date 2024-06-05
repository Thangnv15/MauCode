package com.demo.Repository;

import com.demo.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GenderDAO extends JpaRepository<Gender, UUID> {
}
