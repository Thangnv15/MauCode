package com.demo.controller;

import com.demo.entity.Image;
import com.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class ImageController {
    @Autowired
    ImageService imageService;

    @GetMapping
    public ResponseEntity<?> getAll(){

        return ResponseEntity.ok(imageService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addImage(@RequestBody Image image){
        return ResponseEntity.ok(imageService.addImage(image));
    }
}