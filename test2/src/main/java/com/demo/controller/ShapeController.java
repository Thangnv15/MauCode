package com.demo.controller;

import com.demo.entity.Origin;
import com.demo.entity.Shape;
import com.demo.service.ShapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shape")
public class ShapeController {
    @Autowired
    ShapeService shapeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(shapeService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(shapeService.addExcel(product));
    }

    @PostMapping("/them")
    public ResponseEntity<?> them(@RequestBody Shape shape){
        return ResponseEntity.ok(shapeService.addCasecolor(shape));
    }

    @DeleteMapping("/delete/{mahinhdang}")
    public ResponseEntity<?> delete(@PathVariable("mahinhdang") UUID mahinhdang){
        return ResponseEntity.ok(shapeService.deleteCasecolor(mahinhdang));
    }
}