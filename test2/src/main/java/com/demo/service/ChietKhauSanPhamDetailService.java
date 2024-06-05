package com.demo.service;

import com.demo.Repository.ChietKhauDAO;
import com.demo.Repository.ChietKhauSanPhamDetailDAO;
import com.demo.entity.ChietKhauSanPham;
import com.demo.entity.ChietKhauSanPhamDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChietKhauSanPhamDetailService {
    @Autowired
    ChietKhauSanPhamDetailDAO chietKhauSanPhamDetailDAO;

    public List<ChietKhauSanPhamDetail> getAll(){
        return chietKhauSanPhamDetailDAO.findAll();
    };

    public ChietKhauSanPhamDetail add(ChietKhauSanPhamDetail cksp){
        return chietKhauSanPhamDetailDAO.save(cksp);
    }

    public ChietKhauSanPhamDetail delete(UUID makhuyenmai){
        Optional<ChietKhauSanPhamDetail> optional = chietKhauSanPhamDetailDAO.findById(makhuyenmai);
        return optional.map(o->{
            chietKhauSanPhamDetailDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
