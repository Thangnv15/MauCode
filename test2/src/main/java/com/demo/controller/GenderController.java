package com.demo.controller;

import com.demo.entity.Feature;
import com.demo.entity.Gender;
import com.demo.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/gender")
public class GenderController {
    @Autowired
    GenderService genderService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(genderService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(genderService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Gender gender){
        return ResponseEntity.ok(genderService.addCasecolor(gender));
    }

    @DeleteMapping("/delete/{magioitinh}")
    public ResponseEntity<?> delete(@PathVariable("magioitinh") UUID magioitinh){
        return ResponseEntity.ok(genderService.deleteCasecolor(magioitinh));
    }
}