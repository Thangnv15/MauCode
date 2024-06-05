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
@Table(name = "detailchietkhausanpham")
public class ChietKhauSanPhamDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    Integer giamgia;
    Integer status;
    
    @ManyToOne
    @JoinColumn(name = "id_chietkhausanpham")
    ChietKhauSanPham chietkhausanpham;

    @ManyToOne
    @JoinColumn(name = "id_sanpham")
    WatchDetail watchdetail;
}
