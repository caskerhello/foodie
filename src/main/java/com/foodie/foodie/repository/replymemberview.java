package com.foodie.foodie.repository;


import com.foodie.foodie.entity.Reply;
import com.foodie.foodie.entity.ReplyMemberView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface replymemberview extends JpaRepository<ReplyMemberView, Long> {
    List<ReplyMemberView> findByPostidOrderByReplyidDesc(int postid);
}
