package com.demo.service;

import com.demo.Repository.PhuongThucHoanDAO;
import com.demo.entity.PhuongThucHoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhuongThucHoanService {
    @Autowired
    PhuongThucHoanDAO phuongThucHoanDAO;

    public List<PhuongThucHoan> getAll(){
        return phuongThucHoanDAO.findAll();
    };
}
