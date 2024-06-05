package com.demo.controller;

import com.demo.entity.Account;
import com.demo.entity.AccountRole;
import com.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    AccountService accountService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        for (Account list : accountService.getAll()) {
            List<AccountRole> accountRoles = list.getAccountroles();
            for (AccountRole accountRole : accountRoles) {
                String roleName = accountRole.getRole().getName();
                System.out.println(roleName);
            }
        }
        return ResponseEntity.ok(accountService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Account account){
        return ResponseEntity.ok(accountService.add(account));
    }

//    @GetMapping("/{id}/address")
}
