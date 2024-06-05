package com.demo.service;

import com.demo.Repository.OrderDAO;
import com.demo.Repository.OrderDetailDAO;
import com.demo.entity.Account;
import com.demo.entity.Order;
import com.demo.entity.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderDetailService {
    @Autowired
    OrderDetailDAO orderDetailDAODAO;

    @Autowired
    OrderDAO orderDAO;

    public List<OrderDetail> getAll(){
        return orderDetailDAODAO.findAll();
    };

    public OrderDetail add(OrderDetail orderdetail){
        return orderDetailDAODAO.save(orderdetail);
    }

    public List<OrderDetail> getOrderDetailforOrder(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        List<OrderDetail> listorder = order.getOrderdetails();
        for (OrderDetail ord:listorder){
            System.out.println(ord.getWatchdetail().getBrand().getName());
        }
        return listorder;
    }
}