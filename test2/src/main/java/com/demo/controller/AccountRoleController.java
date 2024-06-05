package com.demo.controller;

import com.demo.entity.Account;
import com.demo.entity.AccountRole;
import com.demo.service.AccountRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/accountrole")
public class AccountRoleController {
    @Autowired
    AccountRoleService accountRoleService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(accountRoleService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AccountRole account){
        return ResponseEntity.ok(accountRoleService.add(account));
    }
}
