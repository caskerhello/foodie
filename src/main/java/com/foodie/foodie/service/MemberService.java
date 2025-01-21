package com.foodie.foodie.service;

import com.foodie.foodie.repository.MemberRepository;
import com.foodie.foodie.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

    @Autowired
    MemberRepository mr;


    public Member getMember(String email) {        return mr.findByEmail(email);
    }

    public Member getMemberByNickname(String nickname) {
        return mr.getMemberByNickname( nickname );
    }

    public void insertMember(Member member) {
        mr.save(member);
    }

    public Member getMemberByMemberid(int id) {
        return mr.getMemberByMemberid(id);
    }

    public void updateMember(Member member) {
        Optional<Member> memberOptional = mr.findByMemberid(member.getMemberid());
        if(memberOptional.isPresent()) {
            Member updateMember = memberOptional.get();
            updateMember.setNickname(member.getNickname());
            updateMember.setEmail(member.getEmail());
            updateMember.setPwd(member.getPwd());
            updateMember.setPhone(member.getPhone());
            updateMember.setProfileimg(member.getProfileimg());
            updateMember.setProfilemsg(member.getProfilemsg());
        }
    }
}
