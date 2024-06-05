package com.demo.controller;

import com.demo.entity.HoaDonTra;
import com.demo.entity.Image;
import com.demo.service.HoaDonTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/hoadontra")
public class HoaDonTraController {
    @Autowired
    HoaDonTraService hoaDonTraService;

    @GetMapping
    public ResponseEntity<?> getAll(){

        return ResponseEntity.ok(hoaDonTraService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addImage(@RequestBody HoaDonTra hoaDonTra){
        return ResponseEntity.ok(hoaDonTraService.add(hoaDonTra));
    }

    @DeleteMapping("/delete/{mahoadon}")
    public ResponseEntity<?> delete(@PathVariable("mahoadon") UUID mahoadon){
        return ResponseEntity.ok(hoaDonTraService.delete(mahoadon));
    }
}
