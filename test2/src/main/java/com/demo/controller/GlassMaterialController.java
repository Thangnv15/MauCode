package com.demo.controller;

import com.demo.entity.Gender;
import com.demo.entity.GlassMaterial;
import com.demo.service.GlassMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chatlieukinh")
public class GlassMaterialController {
    @Autowired
    GlassMaterialService glassMaterialService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(glassMaterialService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(glassMaterialService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody GlassMaterial glassMaterial){
        return ResponseEntity.ok(glassMaterialService.addCasecolor(glassMaterial));
    }

    @DeleteMapping("/delete/{machatlieukinh}")
    public ResponseEntity<?> delete(@PathVariable("machatlieukinh") UUID machatlieukinh){
        return ResponseEntity.ok(glassMaterialService.deleteCasecolor(machatlieukinh));
    }
}