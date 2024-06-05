package com.demo.service;

import com.demo.Repository.ThongBaoAdminDAO;
import com.demo.Repository.ThongBaoUserDAO;
import com.demo.entity.ThongBaoAdmin;
import com.demo.entity.ThongBaoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongBaoAdminService {
    @Autowired
    ThongBaoAdminDAO thongBaoAdminDAO;

    public List<ThongBaoAdmin> getAll(){
        return thongBaoAdminDAO.findAll();
    };

    public ThongBaoAdmin addExcel(ThongBaoAdmin thongbaoadmin){
        return thongBaoAdminDAO.save(thongbaoadmin);
    }
}
