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
@Table(name = "danhgia")
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    Integer diem;
    String comment;
    String image_link1;
    String image_link2;
    String image_link3;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date create_date;

    @ManyToOne @JoinColumn(name = "id_hoadonchitiet")
    OrderDetail hoadonchitiet;

    @ManyToOne @JoinColumn(name = "id_sanpham")
    WatchDetail watchdetail;

}
