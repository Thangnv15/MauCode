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
@Table(name = "thongbaoadmin")
public class ThongBaoAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date create_date;

    Integer status; //0: đã được xác nhận, 1: đang được giao đến bạn, 2: đơn hàng đã được xác nhận hoàn,3,4:đơn hàng bị hủy,5:đơn hàng bị hủy do giao ko thành công

    @ManyToOne @JoinColumn(name = "id_hoadon")
    Order order;
}
