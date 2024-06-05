package com.demo.controller;

import com.demo.entity.Brand;
import com.demo.entity.CaseColor;
import com.demo.service.CaseColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/casecolor")
public class CaseColorController {
    @Autowired
    CaseColorService caseColorService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(caseColorService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(caseColorService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody CaseColor caseColor){
        return ResponseEntity.ok(caseColorService.addCasecolor(caseColor));
    }

    @DeleteMapping("/delete/{mamauvo}")
    public ResponseEntity<?> delete(@PathVariable("mamauvo") UUID mamauvo){
        return ResponseEntity.ok(caseColorService.deleteCasecolor(mamauvo));
    }
}