package com.demo.service;

import com.demo.Repository.CaseColorDAO;
import com.demo.Repository.ProductDAO;
import com.demo.Repository.WatchDetailDAO;
import com.demo.controller.FilterData;
import com.demo.controller.WatchsData;
import com.demo.entity.*;
import com.demo.entity.Shape;
import com.google.gson.Gson;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.persistence.TypedQuery;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.*;

@Service
public class WatchDetailService {
    @Autowired
    WatchDetailDAO watchDetailDAO;

    @Autowired
    CaseColorDAO caseColorDAO;

    @Autowired
    ProductDAO productDAO;

    public List<WatchDetail> getAll(){
//        String filePath = "C:\\Users\\MINH DUC\\Pictures\\Saved Pictures\\Watchs.xlsx";
//        List<WatchDetail> list = watchDetailDAO.findAll();
//        exportToExcel(list,filePath);
        return watchDetailDAO.findAll();
    };

    public List<Image> getImage(UUID watchdetail){
        WatchDetail watchDetail = watchDetailDAO.findById(watchdetail).get();
        List<Image> listimage = watchDetail.getImages();
//        for (Image img:listimage){
//
//            System.out.println("Link ảnh đây nhé:"+img.getImage_link());
//        }
        return listimage;
    }

    public WatchDetail add(WatchDetail watchDetail){
        return watchDetailDAO.save(watchDetail);
    }

    public List<WatchDetail> getJustPrice(FilterData filterData){
        return watchDetailDAO.findbyPrice(filterData.getPriceFrom(),filterData.getPriceTo());
    }

//    public List<WatchDetail> getByReferences(FilterData filterData) {
//        List<WatchDetail> results = new ArrayList<>();
//
//        List<UUID> thuongHieu = filterData.getThuongHieu();
//        List<UUID> mauVo = filterData.getCaseColor();
//
//        if (thuongHieu.isEmpty()) {
//            // Nếu thuongHieu rỗng, bạn có thể thực hiện truy vấn dựa trên mauVo
//            if (!mauVo.isEmpty()) {
//                for (UUID mauVoId : mauVo) {
//                    List<WatchDetail> watches = watchDetailDAO.findReferences(null, mauVoId);
//                    results.addAll(watches);
//                }
//            }
//        } else {
//            // Nếu có thương hiệu, bạn thực hiện truy vấn theo cả thương hiệu và mauVo
//            for (UUID thuongHieuId : thuongHieu) {
//                if (!mauVo.isEmpty()) {
//                    for (UUID mauVoId : mauVo) {
//                        List<WatchDetail> watches = watchDetailDAO.findReferences(thuongHieuId, mauVoId);
//                        results.addAll(watches);
//                    }
//                } else {
//                    // Nếu mauVo rỗng, bạn chỉ thực hiện truy vấn theo thương hiệu
//                    List<WatchDetail> watches = watchDetailDAO.findReferences(thuongHieuId, null);
//                    results.addAll(watches);
//                }
//            }
//        }
//
//        return results;
//    }

    public List<WatchDetail> getByReferences(FilterData filterData) {
        WatchDetail watchDetail = new WatchDetail();
        Brand thuongHieu = (filterData.getThuongHieu().getId() == null) ? null : filterData.getThuongHieu();
        CaseColor caseColor = (filterData.getCaseColor().getId() == null) ? null : filterData.getCaseColor();
        CaseMaterial caseMaterial = (filterData.getCaseMaterial().getId() == null) ? null : filterData.getCaseMaterial();
        Feature feature = (filterData.getFeature().getId() == null) ? null : filterData.getFeature();
        GlassMaterial glassMaterial = (filterData.getGlassMaterial().getId() == null) ? null : filterData.getGlassMaterial();
        MachineType machineType = (filterData.getMachineType().getId() == null) ? null : filterData.getMachineType();
        Origin origin = (filterData.getOrigin().getId() == null) ? null : filterData.getOrigin();
        Shape shape = (filterData.getShape().getId() == null) ? null : filterData.getShape();
        Strap strap = (filterData.getStrap().getId() == null) ? null : filterData.getStrap();


//        System.out.println(watchDetail.getCasecolor());
        return watchDetailDAO.searchByFilters(filterData.getPriceFrom(),filterData.getPriceTo(),
               thuongHieu,caseColor,caseMaterial,feature,glassMaterial,machineType,origin,shape,strap);

//        return watchDetailDAO.searchByFilters(priceFrom,priceTo,listthuongHieu,listmauVo,listchatLieuVo,listtinhNang,
//                chatlieuKinh,dongMay,xuatXu,hinhDang,loaiDay);
    }

    public WatchDetail addWatch(WatchsData watchsData){
        WatchDetail watchDetail = new WatchDetail();
        System.out.println(watchsData);
        watchDetail.setCode(watchsData.getCode());
        watchDetail.setPrice(watchsData.getPrice());
        watchDetail.setPrice_im(watchsData.getPrice_im());
        watchDetail.setQuantity_stock(watchsData.getQuantity_stock());
        watchDetail.setBrand(watchsData.getBrand());
        watchDetail.setMachinetype(watchsData.getMachinetype());
        watchDetail.setGender(watchsData.getGender());
        watchDetail.setStrap(watchsData.getStrap());
        watchDetail.setGlassmaterial(watchsData.getGlassmaterial());
        watchDetail.setFeature(watchsData.getFeature());
        watchDetail.setSize(watchsData.getSize());
        watchDetail.setOrigin(watchsData.getOrigin());
        watchDetail.setCasematerial(watchsData.getCasematerial());
        watchDetail.setCasecolor(watchsData.getCasecolor());
        watchDetail.setShape(watchsData.getShape());
        watchDetail.setProduct(watchsData.getProduct());
        WatchDetail watchFakeID = watchDetailDAO.save(watchDetail);
//        System.out.println(watchFakeID.getId());
        Gson gson = new Gson();
        String data = String.valueOf(watchFakeID.getId());
        String fileName = "product_" + watchDetail.getCode() + ".png";
        String filePath = "C:\\Users\\Admin\\Pictures\\Saved Pictures\\" + fileName;

        int width = 300; // Chiều rộng của hình ảnh QR code
        int height = 300; // Chiều cao của hình ảnh QR code

        Map<EncodeHintType, Object> hints = new EnumMap<>(EncodeHintType.class);
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, width, height, hints);

            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                }
            }

            File outputFile = new File(filePath);
            ImageIO.write(image, "png", outputFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return watchFakeID;
    }

    public WatchDetail updateWatch(UUID idwatch,WatchsData watchsData){
        WatchDetail watchDetail = watchDetailDAO.findById(idwatch).get();
        watchDetail.setCode(watchsData.getCode());
        watchDetail.setPrice(watchsData.getPrice());
        watchDetail.setPrice_im(watchsData.getPrice_im());
        watchDetail.setQuantity_stock(watchsData.getQuantity_stock());
        watchDetail.setBrand(watchsData.getBrand());
        watchDetail.setMachinetype(watchsData.getMachinetype());
        watchDetail.setGender(watchsData.getGender());
        watchDetail.setStrap(watchsData.getStrap());
        watchDetail.setGlassmaterial(watchsData.getGlassmaterial());
        watchDetail.setFeature(watchsData.getFeature());
        watchDetail.setSize(watchsData.getSize());
        watchDetail.setOrigin(watchsData.getOrigin());
        watchDetail.setCasematerial(watchsData.getCasematerial());
        watchDetail.setCasecolor(watchsData.getCasecolor());
        watchDetail.setShape(watchsData.getShape());
        watchDetail.setProduct(watchsData.getProduct());
        WatchDetail updatedWatch = watchDetailDAO.save(watchDetail);

        return updatedWatch;
    }

    public WatchDetail importExcel(WatchsData watchs){
        WatchDetail watchFake = new WatchDetail();
        watchFake.setCode(watchs.getCode());
        watchFake.setPrice(watchs.getPrice());
        watchFake.setPrice_im(watchs.getPrice_im());
        watchFake.setQuantity_stock(watchs.getQuantity_stock());
        watchFake.setDescription(watchs.getDescription());
        watchFake.setStatus(watchs.getStatus());
        watchFake.setBrand(watchs.getBrand());
        watchFake.setMachinetype(watchs.getMachinetype());
        watchFake.setGender(watchs.getGender());
        watchFake.setStrap(watchs.getStrap());
        watchFake.setGlassmaterial(watchs.getGlassmaterial());
        watchFake.setFeature(watchs.getFeature());
        watchFake.setSize(watchs.getSize());
        watchFake.setOrigin(watchs.getOrigin());
        watchFake.setCasematerial(watchs.getCasematerial());
        watchFake.setCasecolor(watchs.getCasecolor());
        watchFake.setShape(watchs.getShape());
        watchFake.setProduct(watchs.getProduct());

        for(WatchDetail prd : watchDetailDAO.findAll()){
            if(watchFake.getCode().equals(prd.getCode())){
                System.out.println("Tồn tại");
                return null;
            }
        }

        if(watchFake.getCode()==null || watchFake.getCode().equals("")){
            return null;
        }else{
            WatchDetail watchFakeID = watchDetailDAO.save(watchFake);
            Gson gson = new Gson();
            String data = gson.toJson(watchFakeID);
            String fileName = "product_" + watchFake.getCode() + ".png";
            String filePath = "C:\\Users\\MINH DUC\\Pictures\\Saved Pictures\\" + fileName;

            int width = 300; // Chiều rộng của hình ảnh QR code
            int height = 300; // Chiều cao của hình ảnh QR code

            Map<EncodeHintType, Object> hints = new EnumMap<>(EncodeHintType.class);
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

            try {
                QRCodeWriter qrCodeWriter = new QRCodeWriter();
                BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, width, height, hints);

                BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                for (int x = 0; x < width; x++) {
                    for (int y = 0; y < height; y++) {
                        image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                    }
                }

                File outputFile = new File(filePath);
                ImageIO.write(image, "png", outputFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return watchFakeID;
        }
    }


    public WatchDetail giamSoLUong(WatchDetail watchDetail, Integer soLuong){
        int soluongReal = watchDetail.getQuantity_stock() - soLuong;
        watchDetail.setQuantity_stock(soluongReal);
        return watchDetailDAO.save(watchDetail);
    }



//    public List<WatchDetail> getAllAndExportToExcel(String filePath) {
//        // Get all watch details from the database
//        List<WatchDetail> watchDetails = watchDetailDAO.findAll();
//        // Export data to Excel
//        exportToExcel(watchDetails, filePath);
//
//        // Return the list of watch details
//        return watchDetails;
//    }

//    public void exportToExcel(List<WatchDetail> watchDetails, String filePath) {
//        try (Workbook workbook = new XSSFWorkbook()) {
//            Sheet sheet = workbook.createSheet("Watch Details");
//
//            // Create header row
//            Row headerRow = sheet.createRow(0);
//            headerRow.createCell(0).setCellValue("Mã sản phẩm");
//            headerRow.createCell(1).setCellValue("Tên sản phẩm");
//            headerRow.createCell(2).setCellValue("Giá bán");
//            headerRow.createCell(3).setCellValue("Giá nhập");
//            headerRow.createCell(4).setCellValue("Số lượng tồn");
//            headerRow.createCell(5).setCellValue("Mô tả");
//            headerRow.createCell(6).setCellValue("Trạng thái");
//            headerRow.createCell(7).setCellValue("QR_Code");
//            headerRow.createCell(8).setCellValue("Thương hiệu");
//            headerRow.createCell(9).setCellValue("Dòng máy");
//            headerRow.createCell(10).setCellValue("Giới tính");
//            headerRow.createCell(11).setCellValue("Loại dây");
//            headerRow.createCell(12).setCellValue("Chất liệu kính");
//            headerRow.createCell(13).setCellValue("Tính năng");
//            headerRow.createCell(14).setCellValue("Kích cỡ");
//            headerRow.createCell(15).setCellValue("Xuất xứ");
//            headerRow.createCell(16).setCellValue("Chất liệu vỏ");
//            headerRow.createCell(17).setCellValue("Màu vỏ");
//            headerRow.createCell(18).setCellValue("Hình dáng");
//
//            // Add more columns as needed
//
//            // Fill data rows
//            int rowNum = 1;
//            for (WatchDetail watchDetail : watchDetails) {
//                Row row = sheet.createRow(rowNum++);
//                row.createCell(0).setCellValue(watchDetail.getCode());
//                row.createCell(1).setCellValue(watchDetail.getProduct().getName());
//                row.createCell(2).setCellValue(watchDetail.getPrice());
//                row.createCell(3).setCellValue(watchDetail.getPrice_im() != null ? String.valueOf(watchDetail.getPrice_im()) : "");
//                row.createCell(4).setCellValue(watchDetail.getQuantity_stock() != null ? String.valueOf(watchDetail.getQuantity_stock()):"");
//                row.createCell(5).setCellValue(watchDetail.getDescription() != null ? String.valueOf(watchDetail.getDescription()) : "");
//                row.createCell(6).setCellValue(watchDetail.getStatus() != null ? String.valueOf(watchDetail.getStatus()) : "");
//                row.createCell(7).setCellValue(watchDetail.getQR_code() != null ? String.valueOf(watchDetail.getQR_code()) : "");
//                row.createCell(8).setCellValue(watchDetail.getBrand().getName());
//                row.createCell(9).setCellValue(watchDetail.getMachinetype().getName());
//                row.createCell(10).setCellValue(watchDetail.getGender().getName());
//                row.createCell(11).setCellValue(watchDetail.getStrap().getName());
//                row.createCell(12).setCellValue(watchDetail.getGlassmaterial().getName());
//                row.createCell(13).setCellValue(watchDetail.getFeature().getName());
//                row.createCell(14).setCellValue(watchDetail.getSize().getName());
//                row.createCell(15).setCellValue(watchDetail.getOrigin().getName());
//                row.createCell(16).setCellValue(watchDetail.getCasematerial().getName());
//                row.createCell(17).setCellValue(watchDetail.getCasecolor().getName());
//                row.createCell(18).setCellValue(watchDetail.getShape().getName());
//
//                // Add more cells for other attributes
//            }
//
//            // Write the workbook to a file
//            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
//                workbook.write(fileOut);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
}
