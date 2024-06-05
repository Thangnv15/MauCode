package com.demo.service;

import com.demo.Repository.LyDoHoanDAO;
import com.demo.entity.LyDoHoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LyDoHoanService {
    @Autowired
    LyDoHoanDAO lyDoHoanDAO;

    public List<LyDoHoan> getAll(){
        return lyDoHoanDAO.findAll();
    };
}
