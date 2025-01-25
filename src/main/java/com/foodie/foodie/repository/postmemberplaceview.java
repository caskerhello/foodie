package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Post;
import com.foodie.foodie.entity.PostMemberPlaceView;
import com.foodie.foodie.entity.PostMemberView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface postmemberplaceview extends JpaRepository<PostMemberPlaceView,Long> {
    Page<PostMemberPlaceView> findAllByOrderByPostidDesc(Pageable pageable);

    List<PostMemberPlaceView> findAllByPlaceid(int placeid);

    Optional<PostMemberPlaceView> findByPostid(int id);
}
