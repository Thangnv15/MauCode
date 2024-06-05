package com.demo.service;

import com.demo.Repository.SizeDAO;
import com.demo.entity.Product;
import com.demo.entity.Shape;
import com.demo.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SizeService {
    @Autowired
    SizeDAO sizeDAO;

    public List<Size> getAll(){
        return sizeDAO.findAll();
    };


    public Size addExcel(String product){
        Size brand = new Size();
        brand.setName(product);
        return sizeDAO.save(brand);
    }

    public Size addCasecolor(Size thuongHieu){
        return sizeDAO.save(thuongHieu);
    }

    public Size deleteCasecolor(UUID mahoadon){
        Optional<Size> optional = sizeDAO.findById(mahoadon);
        return optional.map(o->{
            sizeDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
