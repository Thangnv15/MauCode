package com.demo.service;

import com.demo.Repository.OriginDAO;
import com.demo.entity.MachineType;
import com.demo.entity.Origin;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OriginService {
    @Autowired
    OriginDAO originDAO;

    public List<Origin> getAll(){
        return originDAO.findAll();
    };

    public Origin addExcel(String product){
        Origin brand = new Origin();
        brand.setName(product);
        return originDAO.save(brand);
    }

    public Origin addCasecolor(Origin thuongHieu){
        return originDAO.save(thuongHieu);
    }

    public Origin deleteCasecolor(UUID mahoadon){
        Optional<Origin> optional = originDAO.findById(mahoadon);
        return optional.map(o->{
            originDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
