package com.demo.service;

import com.demo.Repository.CaseMaterialDAO;
import com.demo.Repository.ChietKhauDAO;
import com.demo.entity.CaseMaterial;
import com.demo.entity.ChietKhauSanPham;
import com.demo.entity.HoaDonTra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChietKhauSanPhamService {
    @Autowired
    ChietKhauDAO chietKhauDAO;

    public List<ChietKhauSanPham> getAll(){
        return chietKhauDAO.findAll();
    };

    public ChietKhauSanPham add(ChietKhauSanPham cksp){
        return chietKhauDAO.save(cksp);
    }

    public ChietKhauSanPham delete(UUID makhuyenmai){
        Optional<ChietKhauSanPham> optional = chietKhauDAO.findById(makhuyenmai);
        return optional.map(o->{
            chietKhauDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
