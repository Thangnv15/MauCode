package com.demo.service;

import com.demo.Repository.BrandDAO;
import com.demo.entity.Brand;
import com.demo.entity.HoaDonTra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BrandService {
    @Autowired
    BrandDAO brandDAO;

    public List<Brand> getAll(){
        return brandDAO.findAll();
    };

    public Brand add(String thuongHieu){
        Brand brand = new Brand();
        brand.setName(thuongHieu);
        return brandDAO.save(brand);
    }

    public Brand addBrand(Brand thuongHieu){
        return brandDAO.save(thuongHieu);
    }

    public Brand deleteBrand(UUID mahoadon){
        Optional<Brand> optional = brandDAO.findById(mahoadon);
        return optional.map(o->{
            brandDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
