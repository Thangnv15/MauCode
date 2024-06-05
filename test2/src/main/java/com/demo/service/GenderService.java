package com.demo.service;

import com.demo.Repository.GenderDAO;
import com.demo.entity.Feature;
import com.demo.entity.Gender;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GenderService {
    @Autowired
    GenderDAO genderDAO;

    public List<Gender> getAll(){
        return genderDAO.findAll();
    };

    public Gender addExcel(String product){
        Gender brand = new Gender();
        brand.setName(product);
        return genderDAO.save(brand);
    }

    public Gender addCasecolor(Gender thuongHieu){
        return genderDAO.save(thuongHieu);
    }

    public Gender deleteCasecolor(UUID mahoadon){
        Optional<Gender> optional = genderDAO.findById(mahoadon);
        return optional.map(o->{
            genderDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
