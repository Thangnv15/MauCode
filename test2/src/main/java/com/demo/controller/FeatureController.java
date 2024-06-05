package com.demo.controller;

import com.demo.entity.CaseMaterial;
import com.demo.entity.Feature;
import com.demo.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/feature")
public class FeatureController {
    @Autowired
    FeatureService featureService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(featureService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(featureService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Feature feature){
        return ResponseEntity.ok(featureService.addCasecolor(feature));
    }

    @DeleteMapping("/delete/{matinhnang}")
    public ResponseEntity<?> delete(@PathVariable("matinhnang") UUID matinhnang){
        return ResponseEntity.ok(featureService.deleteCasecolor(matinhnang));
    }
}
