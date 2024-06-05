package com.demo.Repository;

import com.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface WatchDetailDAO  extends  JpaRepository<WatchDetail,UUID> {
    @Query("SELECT p FROM WatchDetail p WHERE " +
            "(:priceFrom IS NULL OR p.price >= :priceFrom) AND " +
            "(:priceTo IS NULL OR p.price <= :priceTo)")
    List<WatchDetail> findbyPrice(@Param("priceFrom") Double priceFrom, @Param("priceTo") Double priceTo);

//    @Query("SELECT w FROM WatchDetail w WHERE " +
//            "(:brandIds IS NULL OR w.brand.id in :brandIds) AND " +
//            "(:caseColorIds IS NULL OR w.casecolor.id in :caseColorIds) AND "+
//            "(:caseMaterialIds IS NULL OR w.casematerial.id in :caseMaterialIds)")
//    List<WatchDetail> findReferences(
//            @Param("brandIds") UUID brandIds,
//            @Param("caseColorIds") UUID caseColorIds,
//            @Param("caseMaterialIds") UUID caseMaterialIds);

//    @Query("SELECT w FROM WatchDetail w WHERE " +
//            "(:brandIds IS NULL OR w.brand.id in :brandIds) and "+
//            "(:casecolorIds IS NULL OR  w.casecolor.id in :casecolorIds) ")
//    List<WatchDetail> findReferences(
//            @Param("brandIds") UUID brandIds,
//            @Param("casecolorIds") UUID casecolorIds);

    @Query("SELECT p FROM WatchDetail p WHERE " +
            "(:priceFrom IS NULL OR p.price >= :priceFrom) AND " +
            "(:priceTo IS NULL OR p.price <= :priceTo) AND " +
            "(:thuongHieu IS NULL OR p.brand = :thuongHieu) AND " +
            "(:caseColor IS NULL OR p.casecolor = :caseColor) AND " +
            "(:caseMaterial IS NULL OR p.casematerial = :caseMaterial) AND " +
            "(:feature IS NULL OR p.feature = :feature) AND " +
            "(:glassMaterial IS NULL OR p.glassmaterial = :glassMaterial) AND " +
            "(:machineType IS NULL OR p.machinetype = :machineType) AND " +
            "(:origin IS NULL OR p.origin = :origin) AND " +
            "(:shape IS NULL OR p.shape = :shape) AND " +
            "(:strap IS NULL OR p.strap = :strap)")
    List<WatchDetail> searchByFilters(
            @Param("priceFrom") Double priceFrom,
            @Param("priceTo") Double priceTo,
            @Param("thuongHieu") Brand thuongHieu,
            @Param("caseColor") CaseColor caseColor,
            @Param("caseMaterial") CaseMaterial caseMaterial,
            @Param("feature") Feature feature,
            @Param("glassMaterial") GlassMaterial glassMaterial,
            @Param("machineType") MachineType machineType,
            @Param("origin") Origin origin,
            @Param("shape") Shape shape,
            @Param("strap") Strap strap
    );


}

