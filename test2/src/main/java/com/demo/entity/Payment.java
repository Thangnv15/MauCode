package com.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "paymentmethods")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String name;

}

