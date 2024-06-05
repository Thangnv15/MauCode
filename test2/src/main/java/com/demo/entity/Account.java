package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String username;
    String pass;
    String email;
    String phone;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date date_of_birth;
    String fullname;
    Integer gender;

    @JsonIgnore
    @OneToMany(mappedBy = "account_address")
    List<Address> address;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    List<Order> order;

    @JsonIgnore
    @OneToMany(mappedBy = "account",fetch = FetchType.EAGER)
    List<AccountRole> accountroles;
}
