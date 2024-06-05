package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.awt.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "watchdetails")
public class WatchDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    String code;
    Double price;
    Double price_im;
    Integer quantity_stock;
    String description;
    String created_by;
    String updated_by;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date created_date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date update_date;
    Integer status;
    Integer is_deleted;
//    String QR_code;

    @ManyToOne @JoinColumn(name = "id_brand")
    Brand brand;

    @ManyToOne @JoinColumn(name = "id_machine_type")
    MachineType machinetype;

    @ManyToOne @JoinColumn(name = "id_gender")
    Gender gender;

    @ManyToOne @JoinColumn(name = "id_strap")
    Strap strap;

    @ManyToOne @JoinColumn(name = "id_glass_material")
    GlassMaterial glassmaterial;

    @ManyToOne @JoinColumn(name = "id_feature")
    Feature feature;

    @ManyToOne @JoinColumn(name = "id_size")
    Size size;

    @ManyToOne @JoinColumn(name = "id_origin")
    Origin origin;

    @ManyToOne @JoinColumn(name = "id_case_material")
    CaseMaterial casematerial;

    @ManyToOne @JoinColumn(name = "id_case_color")
    CaseColor casecolor;

    @ManyToOne @JoinColumn(name = "id_shape")
    Shape shape;

    @ManyToOne @JoinColumn(name = "id_product")
    Product product;

    @JsonIgnore
    @OneToMany(mappedBy = "watchdetail")
    List<Image> images;

}
