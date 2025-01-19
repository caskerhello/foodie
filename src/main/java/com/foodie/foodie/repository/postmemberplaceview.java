package com.foodie.foodie.repository;

import com.foodie.foodie.entity.PostMemberPlaceView;
import com.foodie.foodie.entity.PostMemberView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface postmemberplaceview extends JpaRepository<PostMemberPlaceView,Long> {
    Page<PostMemberPlaceView> findAllByOrderByPostidDesc(Pageable pageable);
}
