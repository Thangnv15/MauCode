package com.demo.controller;

import com.demo.entity.ChietKhauSanPham;
import com.demo.service.ChietKhauSanPhamService;
import com.demo.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chietkhausanpham")
public class ChietKhauSanPhamController {
    @Autowired
    ChietKhauSanPhamService chietKhauSanPhamService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(chietKhauSanPhamService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addChietKhau(@RequestBody ChietKhauSanPham cksp){
        return ResponseEntity.ok(chietKhauSanPhamService.add(cksp));
    }

    @DeleteMapping("/delete/{makhuyenmai}")
    public ResponseEntity<?> delete(@PathVariable("makhuyenmai") UUID makhuyenmai){
        return ResponseEntity.ok(chietKhauSanPhamService.delete(makhuyenmai));
    }
}
