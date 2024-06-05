package com.demo.service;

import com.demo.Repository.StrapDAO;
import com.demo.entity.GlassMaterial;
import com.demo.entity.Size;
import com.demo.entity.Strap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StrapService {
    @Autowired
    StrapDAO strapDAO;

    public List<Strap> getAll(){
        return strapDAO.findAll();
    };

    public Strap addExcel(String product){
        Strap brand = new Strap();
        brand.setName(product);
        return strapDAO.save(brand);
    }

    public Strap addCasecolor(Strap thuongHieu){
        return strapDAO.save(thuongHieu);
    }

    public Strap deleteCasecolor(UUID mahoadon){
        Optional<Strap> optional = strapDAO.findById(mahoadon);
        return optional.map(o->{
            strapDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
