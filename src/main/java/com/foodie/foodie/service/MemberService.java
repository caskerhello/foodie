package com.foodie.foodie.service;

import com.foodie.foodie.dao.MemberRepository;
import com.foodie.foodie.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MemberService {

    @Autowired
    MemberRepository MR;


    public Member getMember(String email) {        return MR.findByEmail(email);
    }

    public Member getMemberByNickname(String nickname) {
        return MR.getMemberByNickname( nickname );
    }

    public void insertMember(Member member) {
        MR.save(member);
    }
}
