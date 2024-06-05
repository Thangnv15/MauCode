package com.demo.controller;

import com.demo.service.LyDoHoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/lydohoan")
public class LyDoHoanController {
    @Autowired
    LyDoHoanService lyDoHoanService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(lyDoHoanService.getAll());
    }
}
