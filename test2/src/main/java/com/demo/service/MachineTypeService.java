package com.demo.service;

import com.demo.Repository.MachineTypeDAO;
import com.demo.entity.GlassMaterial;
import com.demo.entity.MachineType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MachineTypeService {
    @Autowired
    MachineTypeDAO machineTypeDAO;

    public List<MachineType> getAll(){
        return machineTypeDAO.findAll();
    };


    public MachineType addExcel(String product){
        MachineType brand = new MachineType();
        brand.setName(product);
        return machineTypeDAO.save(brand);
    }

    public MachineType addCasecolor(MachineType thuongHieu){
        return machineTypeDAO.save(thuongHieu);
    }

    public MachineType deleteCasecolor(UUID mahoadon){
        Optional<MachineType> optional = machineTypeDAO.findById(mahoadon);
        return optional.map(o->{
            machineTypeDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
