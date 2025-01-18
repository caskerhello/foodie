package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByPostidAndMemberid(int postid, int memberid);

    List<Likes> findByPostid(int postid);
}
