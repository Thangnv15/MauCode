package com.demo.service;

import com.demo.Repository.BrandDAO;
import com.demo.Repository.DanhGiaDAO;
import com.demo.entity.Brand;
import com.demo.entity.DanhGia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhGiaService {
    @Autowired
    DanhGiaDAO danhGiaDAO;

    public List<DanhGia> getAll(){
        return danhGiaDAO.findAll();
    };

    public DanhGia add(DanhGia danhgia){
        return danhGiaDAO.save(danhgia);
    }
}
