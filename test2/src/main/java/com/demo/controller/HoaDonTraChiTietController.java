package com.demo.controller;

import com.demo.entity.HoaDonTra;
import com.demo.entity.HoaDonTraChiTiet;
import com.demo.service.HoaDonTraChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/hoadontrachitiet")
public class HoaDonTraChiTietController {
    @Autowired
    HoaDonTraChiTietService hoaDonTraChiTietService;

    @GetMapping
    public ResponseEntity<?> getAll(){

        return ResponseEntity.ok(hoaDonTraChiTietService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addImage(@RequestBody HoaDonTraChiTiet hoaDonTraChiTiet){
        return ResponseEntity.ok(hoaDonTraChiTietService.add(hoaDonTraChiTiet));
    }

    @GetMapping("/{id}/hoadontrachitietforhoadontra")
    public ResponseEntity<?> getOrderDetailForOrder(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(hoaDonTraChiTietService.getHoaDonTraCTForHoaDonTra(idorder));
    }

    @DeleteMapping("/delete/{mahoadon}")
    public ResponseEntity<?> delete(@PathVariable("mahoadon") UUID mahoadon){
        return ResponseEntity.ok(hoaDonTraChiTietService.delete(mahoadon));
    }
}
