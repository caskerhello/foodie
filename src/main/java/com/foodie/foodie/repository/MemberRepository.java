package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
    Member findByEmail(String email);

    Member getMemberByNickname(String nickname);
}
