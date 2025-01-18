package com.foodie.foodie.service;

import com.foodie.foodie.repository.ImagesRepository;
import com.foodie.foodie.repository.PostRepository;
import com.foodie.foodie.entity.Post;
import com.foodie.foodie.entity.Images;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PostService {
    @Autowired
    PostRepository pr;

    @Autowired
    ImagesRepository ir;

    public Post insertPost(Post post) {

        // 포스트 추가
        Post p = pr.save( post ); // 레코드 추가 + 방금 추가된 레코드를 새로운 엔티티 객체에 저장
        int postid= p.getPostid(); // 방금 추가된 레코드의 id저장


        return p;
    }

    public void insertImages(Images images) {
        ir.save(images);
    }
}
