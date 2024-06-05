package com.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "phuongthuchoantra")
public class PhuongThucHoan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String code;
    String name;
}
