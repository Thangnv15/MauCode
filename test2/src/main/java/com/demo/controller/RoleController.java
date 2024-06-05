package com.demo.controller;

import com.demo.entity.Account;
import com.demo.entity.AccountRole;
import com.demo.entity.Role;
import com.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/role")
public class RoleController {
    @Autowired
    RoleService roleService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Role> list = roleService.getAll();
        for (Role role : list) {
            System.out.println("Role: " + role.getName());
            List<AccountRole> accountRoles = role.getAccountroles();

            for (AccountRole accountRole : accountRoles) {
                Account account = accountRole.getAccount();
                System.out.println("   Account ID: " + account.getId());
                System.out.println("   Account Username: " + account.getUsername());
                System.out.println("   Account Email: " + account.getEmail());
                System.out.println("   Account Phone: " + account.getPhone());
            }
        }
        return ResponseEntity.ok(roleService.getAll());
    }

}
