package com.demo.controller;

import com.demo.entity.Address;
import com.demo.entity.Order;
import com.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(orderService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Order order){
        return ResponseEntity.ok(orderService.add(order));
    }

    @GetMapping("/{id}/orderforaccount")
    public ResponseEntity<?> getOrderForAccount(@PathVariable("id") UUID idaccount){
        return ResponseEntity.ok(orderService.getOrderforAccount(idaccount));
    }

    @PostMapping("/{id}/updateStatus")
    public ResponseEntity<?> updateStatus(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderService.updateStatus(idorder));
    }

    @PostMapping("/{id}/updateStatusGiaohang")
    public ResponseEntity<?> updateStatusGiaoHang(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderService.updateStatusgiaohang(idorder));
    }

    @PostMapping("/huyHoadon")
    public ResponseEntity<?> huyHoaDon(@RequestBody Order order){
        return ResponseEntity.ok(orderService.huyHoadon(order));
    }

    @PostMapping("/{id}/updateStatusGiaohangthanhcong")
    public ResponseEntity<?> updateStatusGiaoHangthanhcong(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderService.updateStatusgiaohangthanhcong(idorder));
    }

    @PostMapping("/{id}/updateStatusGiaohangkhongthanhcong")
    public ResponseEntity<?> updateStatusGiaoHangkhongthanhcong(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderService.updateStatusgiaohangkhongthanhcong(idorder));
    }

    @PostMapping("/{id}/updateStatusHoadonthanhcong")
    public ResponseEntity<?> updateStatusHoadonthanhcong(@PathVariable("id") UUID idorder){
        return ResponseEntity.ok(orderService.updateStatushoadonthanhcong(idorder));
    }
}
