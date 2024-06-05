package com.demo.controller;

import com.demo.entity.*;
import lombok.*;
import org.aspectj.weaver.ast.Or;

import javax.persistence.Entity;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterData {
    private Brand thuongHieu;
    private CaseColor caseColor;
    private CaseMaterial caseMaterial;
    private Feature feature;
    private GlassMaterial glassMaterial;
    private MachineType machineType;
    private Origin origin;
    private Shape shape;
    private Strap strap;
    private Double priceFrom;
    private Double priceTo;

}
