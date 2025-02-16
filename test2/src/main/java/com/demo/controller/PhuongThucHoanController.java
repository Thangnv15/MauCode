package com.demo.controller;


import com.demo.service.PhuongThucHoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/phuongthuchoan")
public class PhuongThucHoanController {
    @Autowired
    PhuongThucHoanService phuongThucHoanService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(phuongThucHoanService.getAll());
    }
}
