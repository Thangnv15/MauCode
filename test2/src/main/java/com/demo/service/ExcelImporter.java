package com.demo.service;

import com.demo.Repository.BrandDAO;
import com.demo.entity.*;
import com.demo.entity.Shape;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

public class ExcelImporter {
    public static void main(String[] args) {
        String filePath = "C:\\Users\\Admin\\Desktop\\DATN\\EXWatchs.xlsx";

        try (FileInputStream fileInputStream = new FileInputStream(new File(filePath));
             Workbook workbook = WorkbookFactory.create(fileInputStream)) {

            // Assuming you have only one sheet in the workbook
            Sheet sheet = workbook.getSheetAt(0);

            // Iterate through each row
            Iterator<Row> rowIterator = sheet.iterator();
            // Skip the header row
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // Create a WatchDetail object for each row
                WatchDetail watchDetail = new WatchDetail();

                // Assuming each column represents a specific property of WatchDetail
                watchDetail.setCode(getStringValue(row.getCell(0)));
                watchDetail.setPrice(getDoubleValue(row.getCell(2)));
                watchDetail.setPrice_im(getDoubleValue(row.getCell(3)));
                watchDetail.setQuantity_stock(getInteger(row.getCell(4)));


                Brand brand = new Brand();
                brand.setName(getStringValue(row.getCell(8)));
                watchDetail.setBrand(brand);


                MachineType dongmay = new MachineType();
                dongmay.setName(getStringValue(row.getCell(9)));
                watchDetail.setMachinetype(dongmay);

                Gender gender = new Gender();
                gender.setName(getStringValue(row.getCell(10)));
                watchDetail.setGender(gender);

                Strap loaiday = new Strap();
                loaiday.setName(getStringValue(row.getCell(11)));
                watchDetail.setStrap(loaiday);

                GlassMaterial chatlieukinh = new GlassMaterial();
                chatlieukinh.setName(getStringValue(row.getCell(12)));
                watchDetail.setGlassmaterial(chatlieukinh);

                Feature tinhnang = new Feature();
                tinhnang.setName(getStringValue(row.getCell(13)));
                watchDetail.setFeature(tinhnang);

                Size size = new Size();
                size.setName(getStringValue(row.getCell(14)));
                watchDetail.setSize(size);

                Origin xuatxu = new Origin();
                xuatxu.setName(getStringValue(row.getCell(15)));
                watchDetail.setOrigin(xuatxu);

                CaseMaterial chatlieuvo = new CaseMaterial();
                chatlieuvo.setName(getStringValue(row.getCell(16)));
                watchDetail.setCasematerial(chatlieuvo);

                CaseColor mauvo = new CaseColor();
                mauvo.setName(getStringValue(row.getCell(17)));
                watchDetail.setCasecolor(mauvo);

                Shape hinhdang = new Shape();
                hinhdang.setName(getStringValue(row.getCell(18)));
                watchDetail.setShape(hinhdang);
                // Set other properties accordingly...

                // Do something with the created WatchDetail object
                System.out.println(watchDetail);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String getStringValue(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                // Nếu kiểu dữ liệu là số, chuyển đổi nó thành chuỗi
                return String.valueOf(cell.getNumericCellValue());
            } else if (cell.getCellType() == CellType.STRING) {
                // Nếu kiểu dữ liệu là chuỗi, trả về giá trị chuỗi
                return cell.getStringCellValue();
            } else {
                // Xử lý các kiểu dữ liệu khác nếu cần
                return "";
            }
        } else {
            return "";
        }
    }


    private static Double getDoubleValue(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                // Nếu kiểu dữ liệu là số, trả về giá trị số
                return cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                // Nếu kiểu dữ liệu là chuỗi, cố gắng chuyển đổi thành số
                try {
                    return Double.parseDouble(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    // Xử lý khi không thể chuyển đổi thành số
                    return 0.0;
                }
            } else {
                // Xử lý các kiểu dữ liệu khác nếu cần
                return 0.0;
            }
        } else {
            return 0.0;
        }
    }

    private static Integer getInteger(Cell cell) {
        if (cell != null) {
            if (cell.getCellType() == CellType.NUMERIC) {
                // Nếu kiểu dữ liệu là số, chuyển đổi thành kiểu Integer
                return (int) cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                // Nếu kiểu dữ liệu là chuỗi, cố gắng chuyển đổi thành số
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    // Xử lý khi không thể chuyển đổi thành số
                    e.printStackTrace();
                    return null; // hoặc có thể trả về một giá trị mặc định khác tùy thuộc vào yêu cầu
                }
            } else {
                // Xử lý các kiểu dữ liệu khác nếu cần
                return null; // hoặc có thể trả về một giá trị mặc định khác tùy thuộc vào yêu cầu
            }
        } else {
            return null; // hoặc có thể trả về một giá trị mặc định khác tùy thuộc vào yêu cầu
        }
    }
}
