package com.demo.controller;

import com.demo.entity.Size;
import com.demo.entity.Strap;
import com.demo.service.StrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/strap")
public class StrapController {
    @Autowired
    StrapService strapService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(strapService.getAll());
    }


    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(strapService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Strap strap){
        return ResponseEntity.ok(strapService.addCasecolor(strap));
    }

    @DeleteMapping("/delete/{mavong}")
    public ResponseEntity<?> delete(@PathVariable("mavong") UUID mavong){
        return ResponseEntity.ok(strapService.deleteCasecolor(mavong));
    }
}
