package com.demo.controller;

import com.demo.entity.ThongBaoAdmin;
import com.demo.entity.ThongBaoUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/checkemail")
public class CheckEmailController {
    @PostMapping("/send-code")
    public ResponseEntity<Map<String, String>> sendCode(@RequestBody CodeRequest codeRequest) {
        String recipientEmail = codeRequest.getUserEmail();
        String code = codeRequest.getCode();

        // Your email sending logic using JavaMail
        try {
            sendEmail(recipientEmail, "Đăng ký tài khoản BeeWatch", "Không chia sẻ cho bất kỳ ai kể cả nhân viên BeeWatch, code của bạn đây: " + code);
            System.out.println("Email sent to " + recipientEmail + " with code: " + code);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Internal Server Error
        }
    }

    @PostMapping("/send-notificationUser")
    public ResponseEntity<Map<String, String>> sendNotification(@RequestBody ThongBaoUser thongBaoUser) {
        String recipientEmail = "ducnmph26290@fpt.edu.vn";

        // Build the email content based on thongBaoUser object
        String subject = "Thông báo về đơn hàng #" + thongBaoUser.getOrder().getCode();
        String body = "";
        if(thongBaoUser.getStatus() == 0){
             body ="Chúc mừng bạn có 1 đơn hàng mới " + thongBaoUser.getOrder().getCode() + "\n"
                    + "Email người dùng: " + thongBaoUser.getOrder().getAccount().getEmail() + "\n"
                    + "Ngày tạo: " + thongBaoUser.getCreate_date() + "\n";
        }

        if(thongBaoUser.getStatus() == 1){
             body ="Khách hàng đã hủy đơn hàng " + thongBaoUser.getOrder().getCode() + "\n"
                    + "Email người dùng: " + thongBaoUser.getOrder().getAccount().getEmail() + "\n"
                    + "Ngày hủy: " + thongBaoUser.getCreate_date() + "\n";
        }

        if(thongBaoUser.getStatus() == 2){
             body ="Khách hàng đã yêu cầu hoàn/đổi với đơn hàng " + thongBaoUser.getOrder().getCode() + "\n"
                    + "Email người dùng: " + thongBaoUser.getOrder().getAccount().getEmail() + "\n"
                    + "Ngày yêu cầu: " + thongBaoUser.getCreate_date() + "\n";
        }

        if(thongBaoUser.getStatus() == 3){
             body ="Khách hàng đã hủy yêu cầu hoàn trả với đơn hàng " + thongBaoUser.getOrder().getCode() + "\n"
                    + "Email người dùng: " + thongBaoUser.getOrder().getAccount().getEmail() + "\n"
                    + "Ngày hủy yêu cầu: " + thongBaoUser.getCreate_date() + "\n";
        }


        // Your email sending logic using JavaMail
        try {
            sendEmail(recipientEmail, subject, body);
            System.out.println("Notification sent to " + recipientEmail + " for order #" + thongBaoUser.getOrder().getCode());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Notification sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Internal Server Error
        }
    }

    @PostMapping("/send-notificationAdmin")
    public ResponseEntity<Map<String, String>> sendNotificationAdmin(@RequestBody ThongBaoAdmin thongBaoAdmin) {
        String recipientEmail = thongBaoAdmin.getOrder().getAccount().getEmail();

        // Build the email content based on thongBaoUser object
        String subject = "Thông báo về đơn hàng " + thongBaoAdmin.getOrder().getCode();
        String body = "";
        if(thongBaoAdmin.getStatus() == 0){
            body ="Đơn hàng của bạn " + thongBaoAdmin.getOrder().getCode() + "\n"
                    + "Được xác nhận vào ngày: " + thongBaoAdmin.getCreate_date() + "\n";
        }

        if(thongBaoAdmin.getStatus() == 1){
            body ="Đơn hàng " + thongBaoAdmin.getOrder().getCode() + " đang được giao đến bạn";
        }

        if(thongBaoAdmin.getStatus() == 2){
            body ="Đơn hàng của bạn" + thongBaoAdmin.getOrder().getCode() + "\n"
                    + " Được xác nhận hoàn vào ngày: " + thongBaoAdmin.getCreate_date() + "\n";
        }

        if(thongBaoAdmin.getStatus() == 3){
            body ="Đơn hàng của bạn " + thongBaoAdmin.getOrder().getCode() + "\n"
                    + " Bị từ chối hoàn vào ngày" + thongBaoAdmin.getCreate_date() + "\n";
        }

        if(thongBaoAdmin.getStatus() == 4){
            body ="Đơn hàng của bạn " + thongBaoAdmin.getOrder().getCode() + "\n"
                    + " Bị hủy vào ngày" + thongBaoAdmin.getCreate_date() + "\n";
        }

        if(thongBaoAdmin.getStatus() == 5){
            body ="Đơn hàng của bạn " + thongBaoAdmin.getOrder().getCode() + "\n"
                    + " Không được giao thành công vào ngày" + thongBaoAdmin.getCreate_date() + "\n";
        }


        // Your email sending logic using JavaMail
        try {
            sendEmail(recipientEmail, subject, body);
            System.out.println("Notification sent to " + recipientEmail + " for order #" + thongBaoAdmin.getOrder().getCode());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Notification sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Internal Server Error
        }
    }

    private void sendEmail(String to, String subject, String body) throws MessagingException {
        // Replace the following details with your email server configuration
        String from = "ducnmph26290@fpt.edu.vn";
        String password = "wvfs ooqc iccq lczx";

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
    }

    static class CodeRequest {
        private String code;
        private String userEmail;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }
    }
}
