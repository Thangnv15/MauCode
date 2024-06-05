package com.demo.Repository;

import com.demo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImageDAO extends JpaRepository<Image, UUID> {
}
