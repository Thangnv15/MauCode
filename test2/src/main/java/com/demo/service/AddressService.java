package com.demo.service;

import com.demo.Repository.AddressDAO;
import com.demo.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AddressService {
    @Autowired
    AddressDAO addressDAO;

    public List<Address> getAll(){
        return addressDAO.findAll();
    };

    public List<Address> getAdressForAccount(UUID idac){
        List<Address> listad = new ArrayList<>();
        for (Address address:addressDAO.findAll()){
            if(address.getAccount_address().getId().equals(idac)){
                listad.add(address);
            }
        }
        return listad;
    }

    public Address add(Address address){
        return addressDAO.save(address);
    }

    public Address delete(UUID idaddress){
        Optional<Address> optional = addressDAO.findById(idaddress);
        return optional.map(o->{
            addressDAO.delete(o);
            return o;
        }).orElse(null);
    }
}
