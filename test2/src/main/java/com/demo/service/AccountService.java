package com.demo.service;

import com.demo.Repository.AccountDAO;
import com.demo.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    AccountDAO accountDAO;

    public List<Account> getAll(){
        return accountDAO.findAll();
    };

    public Account add(Account account){
        return accountDAO.save(account);
    }


}
