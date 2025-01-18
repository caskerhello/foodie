package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
