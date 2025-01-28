package com.foodie.foodie.repository;

import com.foodie.foodie.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);

    Member getMemberByNickname(String nickname);

    Member getMemberByMemberid(int id);

    Optional<Member> findByMemberid(int memberid);
}
