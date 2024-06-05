package com.demo.controller;

import com.demo.entity.CaseColor;
import com.demo.entity.CaseMaterial;
import com.demo.service.CaseMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/casematerial")
public class CaseMaterialController {
    @Autowired
    CaseMaterialService caseMaterialService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(caseMaterialService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(caseMaterialService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody CaseMaterial caseMaterial){
        return ResponseEntity.ok(caseMaterialService.addCasecolor(caseMaterial));
    }

    @DeleteMapping("/delete/{machatlieuvo}")
    public ResponseEntity<?> delete(@PathVariable("machatlieuvo") UUID machatlieuvo){
        return ResponseEntity.ok(caseMaterialService.deleteCasecolor(machatlieuvo));
    }
}
