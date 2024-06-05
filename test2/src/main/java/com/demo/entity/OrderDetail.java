package com.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "orderdetails")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    Integer quantity;
    BigDecimal total_price;
    Integer giamgia;

    @ManyToOne
    @JoinColumn(name = "id_order")
    Order order;

    @ManyToOne
    @JoinColumn(name = "id_watch_detail")
    WatchDetail watchdetail;

}
