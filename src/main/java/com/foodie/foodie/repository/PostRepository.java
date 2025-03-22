package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByOrderByPostidDesc(Pageable pageable);

    List findAllByMemberid(int memberid);

    Optional<Post> findByPostid(int id);

    Optional<Post> findByPostidOrderByPostidDesc(int id);

    List<Post> findAllByMemberidOrderByPostidDesc(int memberid);

    List<Post> findAllByPlaceid(int placeid);
}
