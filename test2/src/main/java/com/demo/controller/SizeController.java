package com.demo.controller;

import com.demo.entity.Shape;
import com.demo.entity.Size;
import com.demo.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/size")
public class SizeController {
    @Autowired
    SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(sizeService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(sizeService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Size size){
        return ResponseEntity.ok(sizeService.addCasecolor(size));
    }

    @DeleteMapping("/delete/{masize}")
    public ResponseEntity<?> delete(@PathVariable("masize") UUID masize){
        return ResponseEntity.ok(sizeService.deleteCasecolor(masize));
    }
}
