package com.demo.Repository;

import com.demo.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressDAO extends JpaRepository<Address, UUID> {
}
