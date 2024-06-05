package com.demo.service;

import com.demo.Repository.RoleDAO;
import com.demo.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleDAO roleDAO;

    public List<Role> getAll(){
        return roleDAO.findAll();
    };
}
