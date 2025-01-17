package com.foodie.foodie.dao;

import com.foodie.foodie.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
