package com.demo.controller;

import com.demo.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WatchsData {
    String name;
    Double price;
    Double price_im;
    String code;
    Integer quantity_stock;
    String description;
    String created_by;
    String updated_by;
    Date created_date;
    Date update_date;
    Integer status;
    Integer is_deleted;
    Brand brand;
    MachineType machinetype;
    Gender gender;
    Strap strap;
    GlassMaterial glassmaterial;
    Feature feature;
    Size size;
    Origin origin;
    CaseMaterial casematerial;
    CaseColor casecolor;
    Shape shape;
    Product product;
    String image;
}
