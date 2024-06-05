package com.demo.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "thongbaouser")
public class ThongBaoUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date create_date;

    Integer soluongsanpham;
    Integer tongtien;
    Integer status;//0:Don hang moi, 1:Don hang huy, 2:Don hang hoan,3:Huy don hang hoan

    @ManyToOne @JoinColumn(name = "id_hoadon")
    Order order;
}
