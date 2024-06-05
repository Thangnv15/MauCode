package com.demo.service;

import com.demo.Repository.HoaDonTraChiTietDAO;
import com.demo.Repository.HoaDonTraDAO;
import com.demo.entity.HoaDonTra;
import com.demo.entity.HoaDonTraChiTiet;
import com.demo.entity.Order;
import com.demo.entity.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonTraChiTietService {
    @Autowired
    HoaDonTraChiTietDAO hoaDonTraChiTietDAO;

    @Autowired
    HoaDonTraDAO hoaDonTraDAO;

    public List<HoaDonTraChiTiet> getAll(){
        return hoaDonTraChiTietDAO.findAll();
    };

    public HoaDonTraChiTiet add(HoaDonTraChiTiet order){
        return hoaDonTraChiTietDAO.save(order);
    }

    public List<HoaDonTraChiTiet> getHoaDonTraCTForHoaDonTra(UUID idorder){
        HoaDonTra order = hoaDonTraDAO.findById(idorder).get();
        List<HoaDonTraChiTiet> listorder = order.getHoadonhoandetails();

        return listorder;
    }

    public HoaDonTraChiTiet delete(UUID mahoadon){
        Optional<HoaDonTraChiTiet> optional = hoaDonTraChiTietDAO.findById(mahoadon);
        return optional.map(o->{
            hoaDonTraChiTietDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
