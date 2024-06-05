package com.demo.service;

import com.demo.Repository.LyDoTuChoiHoanDAO;
import com.demo.entity.LyDoTuChoiHoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LyDoTuChoiHoanService {
    @Autowired
    LyDoTuChoiHoanDAO lyDoTuChoiHoanDAO;

    public List<LyDoTuChoiHoan> getAll(){
        return lyDoTuChoiHoanDAO.findAll();
    };
}
