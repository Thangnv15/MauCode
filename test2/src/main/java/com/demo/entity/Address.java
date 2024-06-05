package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String province_code;
    String district_code;
    String town_code;
    String address_detail;
    String username;
    String phone;
    String email;

    @ManyToOne @JoinColumn(name = "id_account")
    Account account_address;
}
