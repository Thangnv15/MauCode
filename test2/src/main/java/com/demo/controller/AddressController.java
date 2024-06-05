package com.demo.controller;

import com.demo.entity.Address;
import com.demo.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    AddressService addressService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(addressService.getAll());
    }

    @GetMapping("/{id}/account")
    public ResponseEntity<?> getAll(@PathVariable("id") UUID idac){
        return ResponseEntity.ok(addressService.getAdressForAccount(idac));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Address address){
        System.out.println(address.getAddress_detail());
        return ResponseEntity.ok(addressService.add(address));
    }

    @DeleteMapping("/delete/{idaddress}")
    public ResponseEntity<?> delete(@PathVariable("idaddress") UUID idaddress){
        return ResponseEntity.ok(addressService.delete(idaddress));
    }
}