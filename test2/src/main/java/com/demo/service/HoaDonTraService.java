package com.demo.service;

import com.demo.Repository.HoaDonTraDAO;
import com.demo.entity.HoaDonTra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonTraService {
    @Autowired
    HoaDonTraDAO hoaDonTraDAO;

    public List<HoaDonTra> getAll(){
        return hoaDonTraDAO.findAll();
    };

    public HoaDonTra add(HoaDonTra order){
        return hoaDonTraDAO.save(order);
    }

    public HoaDonTra delete(UUID mahoadon){
        Optional<HoaDonTra> optional = hoaDonTraDAO.findById(mahoadon);
        return optional.map(o->{
            hoaDonTraDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
