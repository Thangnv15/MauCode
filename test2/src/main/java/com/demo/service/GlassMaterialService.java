package com.demo.service;

import com.demo.Repository.GlassMaterialDAO;
import com.demo.entity.Feature;
import com.demo.entity.GlassMaterial;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GlassMaterialService {
    @Autowired
    GlassMaterialDAO glassMaterialDAO;

    public List<GlassMaterial> getAll(){
        return glassMaterialDAO.findAll();
    };

    public GlassMaterial addExcel(String product){
        GlassMaterial brand = new GlassMaterial();
        brand.setName(product);
        return glassMaterialDAO.save(brand);
    }

    public GlassMaterial addCasecolor(GlassMaterial thuongHieu){
        return glassMaterialDAO.save(thuongHieu);
    }

    public GlassMaterial deleteCasecolor(UUID mahoadon){
        Optional<GlassMaterial> optional = glassMaterialDAO.findById(mahoadon);
        return optional.map(o->{
            glassMaterialDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
