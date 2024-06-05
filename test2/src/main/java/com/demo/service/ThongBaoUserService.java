package com.demo.service;

import com.demo.Repository.StrapDAO;
import com.demo.Repository.ThongBaoUserDAO;
import com.demo.entity.Strap;
import com.demo.entity.ThongBaoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongBaoUserService {
    @Autowired
    ThongBaoUserDAO thongBaoUserDAO;

    public List<ThongBaoUser> getAll(){
        return thongBaoUserDAO.findAll();
    };

    public ThongBaoUser addExcel(ThongBaoUser thongbaouser){
        return thongBaoUserDAO.save(thongbaouser);
    }
}
