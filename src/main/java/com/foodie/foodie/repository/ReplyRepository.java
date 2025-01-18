package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findByPostidOrderByReplyidDesc(int postid);
}
