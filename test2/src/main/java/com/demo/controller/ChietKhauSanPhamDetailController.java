package com.demo.controller;

import com.demo.entity.ChietKhauSanPham;
import com.demo.entity.ChietKhauSanPhamDetail;
import com.demo.service.ChietKhauSanPhamDetailService;
import com.demo.service.ChietKhauSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chietkhausanphamdetail")
public class ChietKhauSanPhamDetailController {
    @Autowired
    ChietKhauSanPhamDetailService chietKhauSanPhamDetailService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(chietKhauSanPhamDetailService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addChietKhau(@RequestBody ChietKhauSanPhamDetail cksp){
        return ResponseEntity.ok(chietKhauSanPhamDetailService.add(cksp));
    }

    @DeleteMapping("/delete/{makhuyenmai}")
    public ResponseEntity<?> delete(@PathVariable("makhuyenmai") UUID makhuyenmai){
        return ResponseEntity.ok(chietKhauSanPhamDetailService.delete(makhuyenmai));
    }
}
