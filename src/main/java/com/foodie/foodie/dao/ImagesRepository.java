package com.foodie.foodie.dao;

import com.foodie.foodie.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagesRepository extends JpaRepository<Images, Integer> {

    List<Images> findByPostid(int postid);

}

