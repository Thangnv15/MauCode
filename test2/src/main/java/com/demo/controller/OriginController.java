package com.demo.controller;

import com.demo.entity.MachineType;
import com.demo.entity.Origin;
import com.demo.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/origin")
public class OriginController {
    @Autowired
    OriginService originService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(originService.getAll());
    }


    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(originService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Origin origin){
        return ResponseEntity.ok(originService.addCasecolor(origin));
    }

    @DeleteMapping("/delete/{maxuatxu}")
    public ResponseEntity<?> delete(@PathVariable("maxuatxu") UUID maxuatxu){
        return ResponseEntity.ok(originService.deleteCasecolor(maxuatxu));
    }
}