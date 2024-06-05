package com.demo.service;

import com.demo.Repository.PayDAO;
import com.demo.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    PayDAO payDAO;

    public List<Payment> getAll(){
        return payDAO.findAll();
    };
}

