package com.demo.service;

import com.demo.Repository.AccountDAO;
import com.demo.Repository.OrderDAO;
import com.demo.entity.Account;
import com.demo.entity.Order;
import com.demo.entity.WatchDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    OrderDAO orderDAO;

    @Autowired
    AccountDAO accountDAO;

    public List<Order> getAll(){
        return orderDAO.findAll();
    };

    public Order add(Order order){
        return orderDAO.save(order);
    }

    public List<Order> getOrderforAccount(UUID idaccount){
        Account account = accountDAO.findById(idaccount).get();
        List<Order> listorder = account.getOrder();
        for (Order ord:listorder){
            System.out.println(ord.getTotal_money());
        }
        return listorder;
    }

    public Order updateStatus(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(1);
        return orderDAO.save(order);
    }

    public Order updateStatusgiaohang(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(2);
        return orderDAO.save(order);
    }

    public Order huyHoadon(Order orderfake){
        Order order = orderDAO.findById(orderfake.getId()).get();
        order.setStatus(3);
        order.setMota(orderfake.getMota());
        order.setUpdated_by(orderfake.getUpdated_by());
        order.setUpdate_date(orderfake.getUpdate_date());
        return orderDAO.save(order);
    }

    public Order updateStatusgiaohangthanhcong(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(4);
        return orderDAO.save(order);
    }

    public Order updateStatusgiaohangkhongthanhcong(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(5);
        return orderDAO.save(order);
    }

    public Order updateStatushoadonthanhcong(UUID idorder) {
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(6);
        return orderDAO.save(order);
    }


}
