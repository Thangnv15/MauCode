package com.demo.controller;

import com.demo.entity.DanhGia;
import com.demo.service.DanhGiaService;
import com.demo.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/danhgia")
public class DanhGiaController {
    @Autowired
    DanhGiaService danhGiaService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(danhGiaService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProductExcel(@RequestBody DanhGia danhgia){
        return ResponseEntity.ok(danhGiaService.add(danhgia));
    }
}
