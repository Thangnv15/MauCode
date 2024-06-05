package com.demo.service;
import com.demo.controller.WatchsData;
import com.google.gson.Gson;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class QRCodeScanner {
    public static void main(String[] args) {
        String filePath = "C:\\Users\\MINH DUC\\Pictures\\Saved Pictures\\product_RLGII_2.png"; // Đường dẫn tệp QR code bạn muốn quét

        try {
            BufferedImage image = ImageIO.read(new File(filePath));

            if (image != null) {
                LuminanceSource luminanceSource = new BufferedImageLuminanceSource(image);
                BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

                Result result = new MultiFormatReader().decode(binaryBitmap);

                String decodedData = result.getText();
                Gson gson = new Gson();
                WatchsData watchsData = gson.fromJson(result.getText(),WatchsData.class);
                System.out.println("Decoded Data: " + watchsData.getCode());
            } else {
                System.out.println("Could not read the image file.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Thêm đoạn mã sau để tạo đối tượng BufferedImageLuminanceSource
    private static class BufferedImageLuminanceSource extends LuminanceSource {
        private final BufferedImage image;

        BufferedImageLuminanceSource(BufferedImage image) {
            super(image.getWidth(), image.getHeight());
            this.image = image;
        }

        @Override
        public byte[] getRow(int y, byte[] row) {
            for (int x = 0; x < getWidth(); x++) {
                row[x] = (byte) ((image.getRGB(x, y) >> 16) & 0xFF);
            }
            return row;
        }

        @Override
        public byte[] getMatrix() {
            int width = getWidth();
            int height = getHeight();
            byte[] matrix = new byte[width * height];

            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    matrix[y * width + x] = (byte) ((image.getRGB(x, y) >> 16) & 0xFF);
                }
            }

            return matrix;
        }

        @Override
        public boolean isCropSupported() {
            return true;
        }

        @Override
        public LuminanceSource crop(int left, int top, int width, int height) {
            return new BufferedImageLuminanceSource(image.getSubimage(left, top, width, height));
        }

        @Override
        public boolean isRotateSupported() {
            return true;
        }

        @Override
        public LuminanceSource invert() {
            return new BufferedImageLuminanceSource(image);
        }
    }
}

