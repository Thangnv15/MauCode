package com.demo.controller;

import com.demo.entity.OrderDetail;
import com.demo.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/orderdetail")
public class OrderDetailController {
    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(orderDetailService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody OrderDetail orderdetail){
        return ResponseEntity.ok(orderDetailService.add(orderdetail));
    }

    @GetMapping("/{id}/orderdetailfororder")
    public ResponseEntity<?> getOrderDetailForOrder(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderDetailService.getOrderDetailforOrder(idorder));
    }
}
