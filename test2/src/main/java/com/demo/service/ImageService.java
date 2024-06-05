package com.demo.service;

import com.demo.Repository.ImageDAO;
import com.demo.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    @Autowired
    ImageDAO imageDAO;
    public List<Image> getAll(){
        return imageDAO.findAll();
    };

    public Image addImage(Image image){
        return imageDAO.save(image);
    }
}
