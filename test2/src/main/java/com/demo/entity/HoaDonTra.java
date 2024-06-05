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
@Table(name = "hoadontra")
public class HoaDonTra {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String created_by;
    String updated_by;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date created_date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date update_date;

    Integer status; //0:Chờ xác nhận, 1: Đã xác nhận

    @ManyToOne @JoinColumn(name = "id_hoadon")
    Order order;

    @JsonIgnore
    @OneToMany(mappedBy = "hoadontra")
    List<HoaDonTraChiTiet> hoadonhoandetails;
}
