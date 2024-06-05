package com.demo.controller;

import com.demo.service.LyDoTuChoiHoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/lydotuchoihoan")
public class LyDoTuChoiHoanController {
    @Autowired
    LyDoTuChoiHoanService lyDoTuChoiHoanService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(lyDoTuChoiHoanService.getAll());
    }
}
