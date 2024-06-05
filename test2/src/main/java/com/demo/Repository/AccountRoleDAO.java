package com.demo.Repository;

import com.demo.entity.AccountRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRoleDAO extends JpaRepository<AccountRole,Long> {
}
