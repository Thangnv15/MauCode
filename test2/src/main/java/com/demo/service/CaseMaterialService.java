package com.demo.service;

import com.demo.Repository.CaseMaterialDAO;
import com.demo.entity.CaseColor;
import com.demo.entity.CaseMaterial;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CaseMaterialService {
    @Autowired
    CaseMaterialDAO caseMaterialDAO;

    public List<CaseMaterial> getAll(){
        return caseMaterialDAO.findAll();
    };

    public CaseMaterial addExcel(String product){
        CaseMaterial brand = new CaseMaterial();
        brand.setName(product);
        return caseMaterialDAO.save(brand);
    }

    public CaseMaterial addCasecolor(CaseMaterial thuongHieu){
        return caseMaterialDAO.save(thuongHieu);
    }

    public CaseMaterial deleteCasecolor(UUID mahoadon){
        Optional<CaseMaterial> optional = caseMaterialDAO.findById(mahoadon);
        return optional.map(o->{
            caseMaterialDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
