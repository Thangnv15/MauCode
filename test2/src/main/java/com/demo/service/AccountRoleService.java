package com.demo.service;

import com.demo.Repository.AccountRoleDAO;
import com.demo.entity.Account;
import com.demo.entity.AccountRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountRoleService {
    @Autowired
    AccountRoleDAO accountRoleDAO;

    public List<AccountRole> getAll(){
        return accountRoleDAO.findAll();
    };

    public AccountRole add(AccountRole account){
        return accountRoleDAO.save(account);
    }
}
