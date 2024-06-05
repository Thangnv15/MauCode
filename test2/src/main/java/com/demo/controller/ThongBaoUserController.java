package com.demo.controller;

import com.demo.entity.ThongBaoUser;
import com.demo.service.StrapService;
import com.demo.service.ThongBaoUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/thongbaouser")
public class ThongBaoUserController {
    @Autowired
    ThongBaoUserService thongBaoUserService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(thongBaoUserService.getAll());
    }


    @PostMapping("/add")
    public ResponseEntity<?> addProductExcel(@RequestBody ThongBaoUser product){
        return ResponseEntity.ok(thongBaoUserService.addExcel(product));
    }
}
