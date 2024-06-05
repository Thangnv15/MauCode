package com.demo.service;

import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamPanel;
import com.github.sarxos.webcam.WebcamResolution;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;

public class TruyCapCam extends JFrame {

    private volatile boolean stopScanning = false;

    public TruyCapCam() {
        // Tạo webcam và mở nó
        Webcam webcam = Webcam.getDefault();
        webcam.setViewSize(WebcamResolution.VGA.getSize());
        webcam.open();

        // Tạo panel để hiển thị hình ảnh từ webcam
        WebcamPanel panel = new WebcamPanel(webcam);
        panel.setFPSDisplayed(true);
        panel.setImageSizeDisplayed(true);

        // Thêm panel vào frame
        getContentPane().add(panel);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setTitle("QRCode Scanner");
        setSize(640, 480);
        setLocationRelativeTo(null);

        // Bắt đầu quét mã QRCode
        startQRCodeScanning(webcam);
    }

    private void startQRCodeScanning(Webcam webcam) {
        new Thread(() -> {
            while (!stopScanning) {
                BufferedImage image = webcam.getImage();

                // Chuyển đổi ảnh sang định dạng mã nguồn sáng
                LuminanceSource source = new BufferedImageLuminanceSource(image);
                BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

                // Sử dụng MultiFormatReader để đọc mã QRCode
                MultiFormatReader reader = new MultiFormatReader();
                try {
                    Result result = reader.decode(bitmap);

                    // Hiển thị kết quả
                    System.out.println("QRCode content: " + result.getText());

                    // Hiển thị thông báo "Thành công"
                    if (result != null && result.getText() != null) {
                        stopScanning = true; // Dừng quét khi quét thành công
                        JOptionPane.showMessageDialog(this, "Thành công! Dữ liệu: " + result.getText(), "Thành công", JOptionPane.INFORMATION_MESSAGE);
                    }
                } catch (NotFoundException ignored) {
                    // Không tìm thấy mã QRCode trong ảnh
                }
            }

            // Đóng webcam và thoát chương trình khi kết thúc
            webcam.close();
            System.exit(0);
        }).start();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new TruyCapCam().setVisible(true);
        });
    }
}
