package com.demo.Repository;

import com.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountDAO extends JpaRepository<Account, UUID> {
}
