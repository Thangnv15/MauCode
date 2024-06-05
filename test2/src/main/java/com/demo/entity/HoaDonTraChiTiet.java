package com.demo.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "hoadontrachitiet")
public class HoaDonTraChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    UUID id_sanphamhoan;
    Integer soluong;
    BigDecimal total_money ;

    String created_by;
    String updated_by;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date created_date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date update_date;
    String motachitiet;//Lydo-mota cua khach
    String motachitietlydotuchoihoan;//ly do tu choi
    String motalydohoanmotphan;//ly do hoan 1 phan
    Integer soluonghoan;
    UUID id_sanphamshophoan;
    BigDecimal money_hoan;
    Integer trangthaihoansanpham;
    Integer status;

    @ManyToOne @JoinColumn(name = "id_hoadontra")
    HoaDonTra hoadontra;

    @ManyToOne @JoinColumn(name = "id_hoadonchitiet")
    OrderDetail hoadonchitiet;

    @ManyToOne @JoinColumn(name = "id_phuongthuchoan")
    PhuongThucHoan phuongthuchoan;

    @ManyToOne @JoinColumn(name = "id_lydohoan")
    LyDoHoan lydohoan;

    @ManyToOne @JoinColumn(name = "id_lydotuchoihoan")
    LyDoTuChoiHoan lydotuchoihoan;
}
