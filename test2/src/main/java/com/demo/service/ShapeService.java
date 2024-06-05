package com.demo.service;

import com.demo.Repository.ShapeDAO;
import com.demo.entity.Origin;
import com.demo.entity.Product;
import com.demo.entity.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShapeService {
    @Autowired
    ShapeDAO shapeDAO;

    public List<Shape> getAll(){
        return shapeDAO.findAll();
    };

    public Shape addExcel(String product){
        Shape brand = new Shape();
        brand.setName(product);
        return shapeDAO.save(brand);
    }

    public Shape addCasecolor(Shape thuongHieu){
        return shapeDAO.save(thuongHieu);
    }

    public Shape deleteCasecolor(UUID mahoadon){
        Optional<Shape> optional = shapeDAO.findById(mahoadon);
        return optional.map(o->{
            shapeDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
