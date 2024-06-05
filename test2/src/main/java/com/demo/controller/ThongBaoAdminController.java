package com.demo.controller;

import com.demo.entity.ThongBaoAdmin;
import com.demo.entity.ThongBaoUser;
import com.demo.service.ThongBaoAdminService;
import com.demo.service.ThongBaoUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/thongbaoadmin")
public class ThongBaoAdminController {
    @Autowired
    ThongBaoAdminService thongBaoAdminService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(thongBaoAdminService.getAll());
    }


    @PostMapping("/add")
    public ResponseEntity<?> addProductExcel(@RequestBody ThongBaoAdmin product){
        return ResponseEntity.ok(thongBaoAdminService.addExcel(product));
    }
}
