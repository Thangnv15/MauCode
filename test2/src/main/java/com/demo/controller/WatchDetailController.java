package com.demo.controller;

import com.demo.entity.Image;
import com.demo.entity.WatchDetail;
import com.demo.service.ImageService;
import com.demo.service.WatchDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/watch")
public class WatchDetailController {
    @Autowired
    WatchDetailService watchDetailService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        for (WatchDetail list : watchDetailService.getAll()) {
            List<Image> images = list.getImages();
            for (Image listimages : images) {
                System.out.println(listimages.getImage_link());
            }
        }
        return ResponseEntity.ok(watchDetailService.getAll());
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<?> getImage(@PathVariable("id") UUID watchdetail){
        return ResponseEntity.ok(watchDetailService.getImage(watchdetail));
    }

    @PostMapping("/price")
    public ResponseEntity<?> getWatchDetailPrice(@RequestBody FilterData filter){
        return ResponseEntity.ok(watchDetailService.getJustPrice(filter));
    }

    @PostMapping("/references")
    public ResponseEntity<?> getWatchDetailReferences(@RequestBody FilterData filter){
        return ResponseEntity.ok(watchDetailService.getByReferences(filter));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addWatch(@RequestBody WatchsData watchsData){
        return  ResponseEntity.ok(watchDetailService.addWatch(watchsData));
    }

    @PostMapping("/addsanpham")
    public ResponseEntity<?> addWatchDetail(@RequestBody WatchDetail watchDetail){
        return ResponseEntity.ok(watchDetailService.add(watchDetail));
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<?> updateWatch(@PathVariable("id") UUID idwatch,@RequestBody WatchsData watchsData){
        return  ResponseEntity.ok(watchDetailService.updateWatch(idwatch,watchsData));
    }

    @PostMapping("/ImportExcel")
    public ResponseEntity<?> ImportExcel(@RequestBody WatchsData watch){
        System.out.println(watch);
        return ResponseEntity.ok(watchDetailService.importExcel(watch));
    }

    @PostMapping("/giamSoLuong")
    public ResponseEntity<?> GiamSoLuong(@RequestBody WatchDetail watchDetail, @RequestParam Integer soLuong){
        return ResponseEntity.ok(watchDetailService.giamSoLUong(watchDetail,soLuong));
    }
}

