package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String code;
    String name_user;
    String sdt_user;
    String address_user;
    String mota;
    BigDecimal total_money ;
    BigDecimal total_payment ;
    BigDecimal total_payment_off;
    BigDecimal shipping_price;
    Integer status;
//    10: Cho xác nhận hoàn, 11: Đã xác nhận hoàn
    String QR_Code;
    String created_by;
    String updated_by;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date create_date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date update_date;

    @ManyToOne @JoinColumn(name = "id_account")
    Account account;

    @ManyToOne @JoinColumn(name = "id_address")
    Address address;

    @ManyToOne @JoinColumn(name = "id_payment_method")
    Payment payment;

    @JsonIgnore
    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderdetails;

}

